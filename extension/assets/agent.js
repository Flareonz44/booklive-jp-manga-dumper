console.log("Running Booklive JP Manga Dumper...");
let manga_dumped = {};
let ss_tmp = "";
let scanning = false;
let download_request = false;
let enable_download = false;
let dump_checks = 2;
let novel_p = 1;
let global_enable = false;
let error_r = false;
msg_obj = md_setup_msg();
md_setup_keymgr();

// Patch to redirect to original novel source (rather than relying on iframes)

setTimeout(function() {
    if (document.querySelector("#binb")) {
        window.location.href = document.querySelector("#binb").src;
    }
}, 5000);

// Background communication

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'hide') {
        msg_obj.style.display = "none";
        sendResponse({ success: true, message: "ok" });
    }
    if (request.action === "pic") {
        ss_tmp = request.dataUrl;
        msg_obj.style.display = "block";
    }
    if (request.action === "global_enabled") {
        global_enable = true;
        md_start();
    }
});

// Script stuff

function md_setup_msg(){
    let msgc = document.createElement('div');
    msgc.style.position = 'fixed';
    msgc.style.top = '10px';
    msgc.style.right = '10px';
    msgc.style.padding = '10px';
    msgc.style.color = 'white';
    msgc.style.borderRadius = '5px';
    msgc.style.zIndex = '10000';
    msgc.style.display = 'none';
    msgc.style.textAlign = 'center';
    msgc.style.fontFamily = 'monospace';
    msgc.style.backgroundImage = `url(${chrome.runtime.getURL("assets/bg.png")})`;
    msgc.style.backgroundSize = 'cover';
    msgc.style.backgroundPosition = 'center center';
    msgc.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
    document.body.appendChild(msgc);
    return msgc;
}


function md_setup_keymgr(){
    window.addEventListener('keydown', function(event) {
        if (event.key === 'e' && !global_enable){
            chrome.runtime.sendMessage({ action: 'global_enabled' }, (response) => {});
            global_enable = true;
            md_start();
        }else{
            if ((event.key === '1' || event.key === '9') && !scanning) {
                if (document.querySelector("#menu_slidercaption") != null){
                    dump_checks = (event.key ==='1')?2:5;
                    md_scan(Object.keys(manga_dumped));
                    scanning = true;
                }else{
                    md_show_message("Is this a manga?\nIt doesn't seems dumpeable...\n\n>> Press <u>r</u> to restart <<");
                    error_r = true;
                }
            }else if (event.key === '8' && !scanning) {
                if (document.querySelector("#ctmble_menu_lower_indicator_div") != null){
                    chrome.runtime.sendMessage({ action: 'novel_mode' }, (response) => {});
                    md_scan_novels();
                    scanning = true;
                }else{
                    md_show_message("Is this a novel?\nIt doesn't seems dumpeable...\n\n>> Press <u>r</u> to restart <<");
                    error_r = true;
                }
            }else if (event.key === '2' && scanning) {
                download_request = true;
            }else if (event.key === '3' && enable_download) {
                enable_download = false;
                md_download_images(manga_dumped);
            }else if (event.key === '4' && enable_download) {
                enable_download = false;
                md_zip_images(manga_dumped);
            }else if (event.key === 'r' && (enable_download || error_r)) {
                md_restart();
            }
        }
    });
}


function md_show_message(message, download_help = false) {
    let header = "<b>$$$$ BookLiveJP Manga Dumper v2.1 $$$$</b>\n________________________ by <a href='https://linktr.ee/flareonz44' target='_blank' rel='noopener noreferrer' style='color: fuchsia;text-decoration: unset;'>Flareonz44</a>\n\n";
    let footer = "\n\n<small><a href='https://github.com/Flareonz44/booklive-jp-manga-dumper?tab=readme-ov-file#booklivejp-manga-dumper' target='_blank' rel='noopener noreferrer' style='color: aqua;'>Check the README file for help</a></small>\n";
    msg_buid = header;
    if (download_help){
        if (message.length > 0){message="\n\n"+message;}
        msg_buid += "Scan finished, " + Object.keys(manga_dumped).length.toString() + " pages saved\n\n>> Press <u>3</u> to save all png's <<\n>> Press <u>4</u> to download as .zip <<\n>> Press <u>r</u> to restart <<" + message + footer;
    }else{
        msg_buid += message + footer;
    }
    msg_obj.innerHTML = msg_buid.toString().replaceAll("\n", "<br>");
}


function md_download_images(img_dict) {
    md_show_message("Downloading images...", true);
    Object.keys(img_dict).forEach(key => {
        const link = document.createElement('a');
        link.href = img_dict[key]["data"];
        link.download = document.title + " - " + key;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    enable_download = true;
    md_show_message("", true);
}


function md_merge_blobs(blob_list){
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let img_list = [];
    blob_list.forEach(blo => {
        let im = new Image();
        im.src = blo;
        img_list.push(im);
    });
    canvas.width = img_list[0].width;
    canvas.height = 0;
    img_list.forEach(_i => {canvas.height += _i.height;});
    let currentHeight = 0;
    img_list.forEach(img => {
        ctx.drawImage(img, 0, currentHeight, img.width, img.height);
        currentHeight += img.height;
    });
    return canvas.toDataURL();
}


function get_pages(page_list){
    page_list.forEach(page => {
        if (Object.keys(manga_dumped).includes(page)){
            console.log("Downloading " + page + "...");
            let tmp_dic = {}
            tmp_dic[page] = manga_dumped[page]
            md_download_images(tmp_dic);
        }else{
            console.log("Page " + page.toString() + " not saved!");
        }
    });
}


function md_zip_images(img_dict){
    md_show_message("Generating zip...", true)

    const zip = new JSZip();

    Object.keys(img_dict).forEach(key => {
        const base64Data = img_dict[key]["data"].split(',')[1];
        zip.file(key, base64Data, { base64: true });
    });

    zip.generateAsync({type:"blob"}).then(function(content) {
        md_show_message("Downloading zip...", true);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = document.title + ".zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        enable_download = true;
        md_show_message("", true);
    });
}


function md_scan(scanned_keys){
    md_show_message(((dump_checks>2)?"Hard":"Lite") + " scanning, " + scanned_keys.length.toString() + " pages discovered\n\n>> Press <u>2</u> to finish scan <<");
    let main_pages_struct = document.querySelector("#content");
    let main_pages_loaded = Array.from(main_pages_struct.children); 
    dump = {};
    main_pages_loaded.forEach(page => {
        if (page.hasChildNodes() && page.id.startsWith("content-")){
            keyn = page.id.replace("content-", "")+".png";
            if (scanned_keys.includes(keyn)){
                if (manga_dumped[keyn]["count"] >= dump_checks){
                    return;
                }
            }
            let _imgl = [];
            page.querySelectorAll("img").forEach(_img => {
                _imgl.push(_img.currentSrc);
            });
            if (_imgl.length != 3){
                return;
            }
            let png_merged = {"data":md_merge_blobs(_imgl), "count":(scanned_keys.includes(keyn))?manga_dumped[keyn]["count"]+1:1};
            if (png_merged["data"].length < 500){
                return;
            }
            dump[keyn] = png_merged;
        }
    });
    manga_dumped = {...manga_dumped, ...dump};
    if (!download_request){
        setTimeout(() => md_scan(Object.keys(manga_dumped)), 300);
    } else {
        md_show_message("", true);
        enable_download = true;
    }
}


function md_scan_novels(){
    md_show_message("Novel scanner running, click on the\n<b>extension icon</b> to scan current page\n\n" + Object.keys(manga_dumped).length.toString() + " pages captured\n\n>> Press <u>2</u> to finish scan <<");
    if (ss_tmp && ss_tmp.length > 10){
        page_n = "p" + novel_p.toString() + ".png"
        novel_p++;
        manga_dumped[page_n] = {data: ss_tmp};
        ss_tmp = "";
    }
    if (!download_request){
        setTimeout(() => md_scan_novels(), 500);
    } else {
        md_show_message("", true);
        enable_download = true;
    }
}

// Startup

function md_start(){
    md_show_message("<b>MANGAS</b>\n>> Press <u>1</u> to start <b>lite</b> scan <<\n>> Press <u>9</u> to start <b>hard</b> scan <<\n<b>NOVELS</b>\n>> Press <u>8</u> to start scanning <<");
    msg_obj.style.display = "block";
}

function md_restart(){
    manga_dumped = {};
    ss_tmp = "";
    scanning = false;
    download_request = false;
    enable_download = false;
    dump_checks = 2;
    novel_p = 1;
    let error_r = false;
    md_start();
}