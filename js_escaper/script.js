let data_id = hyperlink.id;
let parent = document.querySelector(`[data-id=\"${data_id}\"]`).parentElement

if (parent.querySelector('[class^="loader"]') == null) { // ещё нет loader
    let old_child_style = parent.children[0].style["vertical-align"];
    parent.children[0].style["vertical-align"] = "middle";
    let size = 20;
    try {
        size = parent.clientHeight * 2 / 3;
    } catch(e) {
        console.log("Cant determine parent height! " + e);
    }

    let border_size = size / 4;
    let margin_left = border_size;

    let styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerHTML = `
        .loader${data_id} {
          border: ${border_size}px solid #f3f3f3; /* Light grey */
          border-top: ${border_size}px solid #3498db; /* Blue */
          border-radius: 50%;
          width: ${size}px;
          height: ${size}px;
          display: inline-flex;
          vertical-align: middle;
          margin-left: ${margin_left}px;
          animation: spin${data_id} 2s linear infinite;
        }

        @keyframes spin${data_id} {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);


    let child = document.createElement("div");
    child.className = `loader${data_id}`;

    parent.appendChild(child);

    setTimeout(function(){
        parent.children[0].style["vertical-align"] = old_child_style;
        child.remove();
        styleSheet.remove();
    }, 5000);
}

