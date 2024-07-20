# BookLive.jp Manga Dumper
A simple semi-automatic manga dumper

## Setup

To setup the script, go to the [booklivejp-dumper-min.js](booklivejp-dumper-min.js) file and click on the 'copy raw file' button:

![image](https://github.com/user-attachments/assets/b36fa043-b633-42c1-8ded-e9ca24224a63)

Now, go to your booklive.jp dashboard and choose a manga you want to dump. Open the web view reading mode:
<details>
  <summary>Show image</summary>
  
![image](https://github.com/user-attachments/assets/ec3c0367-a1c3-4fce-a444-91c871144792)
</details>

Once you are there, open a dev-tool's console, paste the code you copied and press enter to execute it. You should see something like this:
<details>
  <summary>Show image</summary>
  
![image](https://github.com/user-attachments/assets/e8c2aa7e-f7c5-4be1-b818-29cbe5a46d60)
</details>

### Tips

You can save this script to run it whenever you want, without having to copy and paste it every time, just add a new bookmark. In the URL field, you should type `javascript: [paste copied script]` and save it. Now just click on the bookmark to run the script.
<details>
  <summary>Show image</summary>
  
![image](https://github.com/user-attachments/assets/55c77efd-d4ee-4818-9e8a-6e78f12fc891)
</details>

## Execution

### Scan modes
Sometimes, the script scans pages that are still loading, resulting in broken or corrupted page scans. This can be resolved with multiple scan checks, though it may slightly reduce performance.
- **[1] Lite scan**: Will make a single scan of each page. Faster scan time, but ~5% chances of broken pages.
- **[9] Hard scan**: Will make up to 5 scans of each page. Slower scan time, but ~0.01% chances of broken pages
> Note that the accuracy of scans will depend on your internet speed, a very low loading speed may result in higher amount of broken pages.

### Scanning process
The scanning process is not automatic, so you have to turn the pages manually with the arrow keys. As you turn pages, the script will constantly scan and save the pages. Once the amount of saved pages matches the length of the manga (or whenever you want), you can press **[2]** to finish the scan.

### Saving
To save your scanned manga, you have three ways:
- **[3] Save all png's**: The most disgusting way of saving it. It will prompt you a save-as window for **each** page saved (150 pages saved = 150 prompts)
- **[4] Save as .zip**: Will put all the saved images inside of a zip file and prompt to download it. It may take several seconds to generate the zip, depending on the length of the manga and the size of the scans.
- **get_pages()**: If you need a particular set of pages, open a dev-tool's console and run this function. It accepts a single parameter of list type, in which you have to write all the pages you want. Pages are saved as "pX.png" in memory, "X" meaning the page number.  
  `get_pages(["p1.png"]);` -> Downloads just the page 1, if saved.  
  `get_pages(["p1.png", "p2.png", ...]);` -> Downloads page 1 and 2, if saved.
