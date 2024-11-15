import math
import random
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os
import shutil
import textwrap

COORDINATES = {
    "Onderon" : ["O-09", "ON_04"],
    "Nar Shaddaa" : ["S-12", "NA_14"],
    "Corellia" : ["M-11", "CO_02"],
    "Sullust" : ["M-17", "SU_04"],
    "Kuat" : ["M-10", "KU_01"],
    "Coruscant" : ["L-09", "CO_01"],
    "Tatooine" : ["R-16", "TA_26"],
    "Raxus Prime" : ["S-05", "RA_01"],
    "Ryloth" : ["R-17", "RY_05"],
    "The Wheel" : ["R-07", "WH_12"],
    "Vergesso" : ["P-17", "VE_07"],
    "Kashyyyk" : ["P-09", "KA_03"],
    "Ord Mantell" : ["L-07", "OR_02"],
}

MINING = ["Ryloth", "The Wheel", "Vergesso", "Kashyyyk", "Ord Mantell", "Raxus Prime", "Nar Shaddaa"]
DESTINATIONS = ["Sullust", "Kuat", "Coruscant"]
GOODS = ["Phrik Crate","Industrial Ore Crate","Slave","Tibanna Gas Tank","Fabricated Plastic Container","Silica Crate","Bacta Tank","Wood Bundle","Tin Crate","Brass Crate","Tydirium Crate"]

class Shipment:
    def __init__(self) -> None:
        self.origin: str = None
        self.destination: str = None
        self.shipping_company: str = None 
        self.bill_number: str = None 
        self.goods: dict = {}
        self.note: str = "" 
        self.date: str = None
        self.consignee = None

def generate_month(month: str) -> list[Shipment]:
    rdm = random.Random()
    finalList: list[Shipment] = []

    while len(finalList) < 50:       
        if rdm.randrange(100) <= 60:
            planet = rdm.choice(MINING)
            destination = "Nar Shaddaa"
            shipping_company = "Zelcomm Industries"
        else:
            if rdm.randrange(100) <= 30:
                planet = "Nar Shaddaa"
                destination = "Onderon"
            else:
                planet = "Onderon"
                destination = rdm.choice(DESTINATIONS) if rdm.randrange(100)<=25 else "Corellia"
            shipping_company = "Xomit Transport Systems"
        
        fromCoord, fromSigle = COORDINATES[planet]        
        toCoord, toSigle = COORDINATES[destination]
        
        day = str(rdm.randint(7 if month == "03" else 1, 31)).zfill(2)
        date = f"7975/{month}/{day}"

        #Shipment must now be a Shipment class instance
        shipment = Shipment()
        shipment.date = date
        shipment.origin = f"{fromSigle} ({fromCoord})"
        shipment.destination = f"{toSigle} ({toCoord})"
        shipment.shipping_company = shipping_company
        shipment.consignee = shipment.destination
        for key in rdm.choices(GOODS, k=math.floor(rdm.randrange(1,4))):
            shipment.goods[key] = rdm.randrange(1,100)

        # generate_bill_of_lading(shipment)
        finalList.append(shipment)

    if month == "03":
        # This shipment's bill number has to be 85 468 567
        shipment = finalList[0]
        shipment.date = "7975/03/06"
        shipment.origin = "TA_26 (R-16)"
        shipment.destination = "NA_14 (S-12)"
        shipment.goods = {
            "Industrial Ore Crate": 10
        }
    if month == "06":
        shipment = finalList[0]
        shipment.date = "7975/06/16"
        shipment.origin = "RA_01 (S-05)"
        shipment.destination = "NA_14 (S-12)"
        shipment.goods = {
            "Industrial Ore Crate": 10
        }
    if month == "09":
        shipment = finalList[0]
        shipment.date = "7975/09/03"
        shipment.origin = "ON_04 (O-09)"
        shipment.destination = "CO_02 (M-11)"
        shipment.consignee = "REDACTED"
        shipment.goods = {
            "Industrial Ore Crate": 10,
            "Phrik Crate": 10,
            "Slave": 28
        }
        shipment.note = "This shipment contains 2 special prisonners that must be deliver with vigilance as quickly as possible to sfs-14. You can ask for Engineer Rark Muffalo, he'll know what to do."
    
    finalList = sorted(finalList, key=lambda x: x.date)
    for index, shipment in enumerate(finalList):
        shipment.bill_number = str(85468467 + ((int(month)-1)*50) + index)
        generate_bill_of_lading(month, shipment)
    return finalList

def generate_data() -> dict[str, list[Shipment]]:
    finalDict: dict[str, list[Shipment]] = {}
    for index in range(9,0,-1):
        month = str(index).zfill(2)
        shutil.rmtree(month)
        os.mkdir(month)
        finalDict[month] = generate_month(month)
    return finalDict

def generate_bill_of_lading(month: str, shipment: Shipment) -> None:
    origin = shipment.origin
    destination = shipment.consignee
    shipping_company = shipment.shipping_company
    bill_number = shipment.bill_number
    goods = shipment.goods
    note = shipment.note
    date = shipment.date
    
    # Define the logo image path
    logo_path = "empire_logo.jpg"

    # Create a new PDF canvas for the shipment
    file_path = f"./{month}/{date.replace('/', '-')}_{bill_number}.pdf"
    c = canvas.Canvas(file_path, pagesize=letter)

    # Set up the logo image
    logo_width = 1.5 * inch
    logo_height = 1.5 * inch
    c.drawImage(logo_path, 250, letter[1] - logo_height - 50, width=logo_width, height=logo_height)

    # Draw the bill of lading information
    c.drawString(50, letter[1] - logo_height - 80, "Origin: " + origin)
    c.drawString(50, letter[1] - logo_height - 100, "Destination: " + destination)
    c.drawString(50, letter[1] - logo_height - 120, "Shipping Company: " + shipping_company)
    c.drawString(50, letter[1] - logo_height - 140, "Date: " + date)
    c.drawString(50, letter[1] - logo_height - 160, "Bill Number: " + bill_number)

    # Draw a table of goods
    table_start_y = letter[1] - logo_height - 200
    table_end_y = table_start_y - 200
    c.rect(50, table_end_y, 500, table_start_y - table_end_y, stroke=True, fill=False)
    c.drawString(60, table_start_y - 20, "Quantity")
    c.drawString(160, table_start_y - 20, "Name")
    for i, [good, quantity] in enumerate(goods.items()):
        c.drawString(60, table_start_y - (i+2) * 20, str(quantity)+"x")
        c.drawString(160, table_start_y - (i+2) * 20, good)

    # Draw the note
    # Set the maximum width of each line
    max_width = 80

    # Split the note into lines that fit within the maximum width
    note_lines = textwrap.wrap(note, max_width)

    # Draw the note
    c.drawString(50, table_end_y - 50, "Note: ")
    for i, line in enumerate(note_lines):
        c.drawString(50, table_end_y - 70 - i * 20, line)

    # Save the canvas as a new PDF file
    c.save()

def generate_shipment_log(month: str, data: list[Shipment]) -> None:
    filename = f"./7975-{month}-01_Shipment_Log.pdf"
    doc_title = f"Shipment Log"
    
    # Create a new PDF document
    c = canvas.Canvas(filename, pagesize=letter)
    
    # Set the font to Aurebesh
    pdfmetrics.registerFont(TTFont('Aurebesh', '../star wars/aurebesh/aurebesh.otf'))
    c.setFont('Aurebesh', 24)
    
    # Write the document title
    c.drawString(2*inch, 10.5*inch, doc_title)
    
    # Write the table header
    c.setFont('Aurebesh', 14)
    c.drawString(1*inch, 10*inch, "Date")
    c.drawString(3*inch, 10*inch, "Orig")
    c.drawString(5*inch, 10*inch, "Dest.")
    
    # Write the table data
    c.setFont('Helvetica', 10)
    row_height = 0.2*inch
    x = 1*inch
    y = 9.75*inch
    for row in data:
        if y < row_height:
            c.showPage()
            c.setFont('Aurebesh', 14)
            c.drawString(1*inch, 10*inch, "Date")
            c.drawString(3*inch, 10*inch, "Orig")
            c.drawString(5*inch, 10*inch, "Dest.")
            y = 9.75*inch
            c.setFont('Helvetica', 10)
        c.drawString(x, y, row.date)
        c.drawString(x+2*inch, y, row.origin)
        c.drawString(x+4*inch, y, row.destination)
        y -= row_height
    
    # Save the PDF document
    c.showPage()
    c.save()

def main():      
    finalList = generate_data()
    for month, data in finalList.items():
        generate_shipment_log(month, data)

if __name__ == "__main__":
    main()
