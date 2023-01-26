// ! Not finished converting it from python
// ! Only here to provide a base

const intro_screen = () => {
	const ifconfig = `
        eth0      Link encap:Ethernet  HWaddr 09:00:12:90:e3:e5  
                inet addr:192.168.1.29 Bcast:192.168.1.255  Mask:255.255.255.0
                inet6 addr: fe80::a00:27ff:fe70:e3f5/64 Scope:Link
                UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
                RX packets:54071 errors:1 dropped:0 overruns:0 frame:0
                TX packets:48515 errors:0 dropped:0 overruns:0 carrier:0
                collisions:0 txqueuelen:1000 
                RX bytes:22009423 (20.9 MiB)  TX bytes:25690847 (24.5 MiB)
                Interrupt:10 Base address:0xd020 
        lo        Link encap:Local Loopback  
                inet addr:127.0.0.1  Mask:255.0.0.0
                inet6 addr: ::1/128 Scope:Host
                UP LOOPBACK RUNNING  MTU:16436  Metric:1
                RX packets:83 errors:0 dropped:0 overruns:0 frame:0
                TX packets:83 errors:0 dropped:0 overruns:0 carrier:0
                collisions:0 txqueuelen:0 
                RX bytes:7766 (7.5 KiB)  TX bytes:7766 (7.5 KiB)
        wlan0     Link encap:Ethernet  HWaddr 58:a2:c2:93:27:36  
                inet addr:192.168.1.64  Bcast:192.168.2.255  Mask:255.255.255.0
                inet6 addr: fe80::6aa3:c4ff:fe93:4746/64 Scope:Link
                UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
                RX packets:436968 errors:0 dropped:0 overruns:0 frame:0
                TX packets:364103 errors:0 dropped:0 overruns:0 carrier:0
                collisions:0 txqueuelen:1000 
                RX bytes:115886055 (110.5 MiB)  TX bytes:83286188 (79.4 MiB)
    `;

	//console.log(Fore.GREEN + "linux@kali:~$ ", (end = ""));
	console.log("ifconfig");
	// time.sleep(2)
	console.log(ifconfig);

	//console.log("linux@kali:~$ ", (end = ""));
	// time.sleep(5)
	typing("sh terminal -force");
	// time.sleep(3)
	console.log("\n\tConnection to terminal established \n");

	// console.log("linux@kali:~$ ", (end = ""));
	// time.sleep(5)
	typing("sudo root start hacking.exe\n");
	// time.sleep(3)
	// console.log("\n" + "-" * 100);
};

const split_terminals = () => {
	//skill_bonus = input(Fore.WHITE + "Please enter your skill bonus: ");
	//console.log("\n" + "-" * 100);
	console.log(`
To hack the password you must enter a valid {'5'} characters combination among the following available ones:
    {'[0,1,2,3,4,5,6,7,8,9]'}
     
You have {'13'} guess available before you're kicked from the terminal. 
     
Each time you try a new combination, your laptop will give you feedback on your guess. For each character in the combination, it will show one of the three following symbols:
    `);
	//console.log(Fore.GREEN + "\u2B24", (end = "  This means a full match.\n"));
	// console.log(
	// 	Fore.YELLOW + "\u2B24",
	// 	(end = "  This means a character is right but not at the right place in the combination.\n")
	// );
	// console.log(Fore.RED + "\u2B24", (end = "  This means a wrong character.\n\n"));
	// console.log(
	// 	Fore.WHITE +
	// 		"Please note that the feedback won't be in the same order as your combination. The symbols are grouped by meanings.\n"
	// );
	// console.log("-" * 100 + "\n");
};

const typing = (text: string) => {
	for (const char in Array.from(text)) {
		// time.sleep(0.1)
		// stdout.write(char)
		// stdout.flush()
	}
};

const main = () => {
	intro_screen();
	split_terminals();
};

main();

export {};
