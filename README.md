# BookLive.jp Manga Dumper
A simple semi-automatic manga dumper

## Changelog for version 2.1
- Now it's an extension!
- Added support for novel scanning
- Internal code upgrade
- Removed Herobrine

## Installation

To install the extension in your **chromium-based** browser (Firefox and Safari are not supported), follow there steps:
1. Download the [booklivejp_manga_dumper.crx](booklivejp_manga_dumper.crx) file
2. Go to your [Extensions Dashboard](chrome://extensions/)
3. Enable the Developer Mode
4. Drag the .crx file to the extension tile's area
5. Click on 'Add Extension'

I highly recommend pinning it to the toolbar through the jigsaw icon in the toolbar:

![image](https://github.com/user-attachments/assets/e9e32670-406e-4388-a779-870f78a0d49f)

### Installation errors
If you followed the instructions and the extension's tile show a message like this:

![image](https://github.com/user-attachments/assets/fb6e77b2-34ec-4fa1-b311-3635d8ba92ce)

Then you have to follow this steps to install it:
1. Go to [the main page of the repo](https://github.com/Flareonz44/booklive-jp-manga-dumper)
2. Click on the Green Button labeled `<> Code`, then click on `Download ZIP` and save it
3. Unzip the file and save the resulting folder in a safe place (where you are not likely to delete it)
4. In your [Extensions Dashboard](chrome://extensions/) with Dev Mode enabled, click on `Load unpacked`
5. Navigate to the extracted folder and select the one called `extension`

It should be loaded instantly, so you are ready to start dumping!


## Usage

### Enable it!
By default, the script will be disabled. To enable it, just press 'e' while in the Booklive.jp Web Reader.

### Manga Scanning
#### Scan modes
Sometimes, the script scans pages that are still loading, resulting in broken or corrupted page scans. This can be resolved with multiple scan checks, though it may slightly reduce performance.
- **[1] Lite scan**: Will make a single scan of each page. Faster scan time, but ~5% chances of broken pages.
- **[9] Hard scan**: Will make up to 5 scans of each page. Slower scan time, but ~0.01% chances of broken pages
> Note that the accuracy of scans will depend on your internet speed, a very low loading speed may result in higher amount of broken pages.

#### Scanning process
The scanning process is not automatic, so you have to turn the pages manually with the arrow keys. As you turn pages, the script will constantly scan and save the pages. Once the amount of saved pages matches the length of the manga (or whenever you want), you can press **[2]** to finish the scan.

### Novel Scanning
The Novel Scanning process is a bit different. Because of Security Policies, the only way I found is by simply taking screenshots. Press **[8]** to begin.

#### Scanning process
Once the Web Reader is fully loaded, click the extension icon to capture the current page. The script window will hide for half a second, and once it reappears, you can turn the page. The script will save all captures taken. When you're done, press [2] to finish the scan.
> Note that because novels don't have a paging system like mangas, saved captures will always start with 'p1.png', *no matter where you start scanning*. Also, the capture resolution is tied to your screen resolution, so to get a higher-quality image, switch to a larger monitor or use the browser's zoom tool.

### Saving
To save your scanned manga, you have three ways:
- **[3] Save all png's**: The most disgusting way of saving it. It will prompt you a save-as window for **each** page saved (150 pages saved = 150 prompts)
- **[4] Save as .zip**: Will put all the saved images inside of a zip file and prompt to download it. It may take several seconds to generate the zip, depending on the length of the manga and the size of the scans.
- **get_pages()**: If you need a particular set of pages, open a dev-tool's console and switch to the extension's context to run this function. It accepts a single parameter of list type, in which you have to write all the pages you want. Pages are saved as "pX.png" in memory, "X" meaning the page number.  
  `get_pages(["p1.png"]);` -> Downloads just the page 1, if saved.  
  `get_pages(["p1.png", "p2.png", ...]);` -> Downloads page 1 and 2, if saved.

## Screenshots

![image](https://github.com/user-attachments/assets/c7b39296-0d09-45d8-974f-935817768278)

![image](https://github.com/user-attachments/assets/27d14d66-1ad2-4ce6-85ac-5d704a2ac5e0)
