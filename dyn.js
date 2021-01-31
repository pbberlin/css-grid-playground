
var itemCounter = 0;

var lorem = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam ipsam distinctio reprehenderit maxime aperiam blanditiis doloremque dicta sunt tempora dolores? Laborum inventore placeat distinctio doloribus rerum veniam voluptatibus quos repudiandae, nobis consequatur cumque facere, dolor nihil excepturi numquam. Asperiores soluta quibusdam sapiente ad dolorum, dolore in error necessitatibus blanditiis vel officia minus porro quas consequuntur incidunt commodi itaque laboriosam ipsam nobis velit consequatur sint iusto voluptas aliquam. Minima dolorum maiores temporibus in ab magni, ex, molestiae natus iure atque explicabo, accusantium beatae saepe! Sint, ex, accusamus, ea blanditiis cumque harum voluptate neque molestiae sit maiores deserunt dolorum nesciunt corporis perferendis! Optio quisquam labore doloremque cumque, porro in. Molestias, alias totam reprehenderit atque ea maiores quo. Laboriosam suscipit fugiat, tenetur accusantium sint unde totam illo. Eius fuga sit, provident, corporis est eaque dignissimos aut fugit error id adipisci voluptatum aspernatur praesentium tempore nobis necessitatibus magni? Doloribus non iure, saepe quaerat maiores, inventore in, reprehenderit tempore deserunt est earum sapiente. Iure nam sapiente ullam qui, libero rerum odio dolorum perspiciatis facilis distinctio ipsam doloribus dolores sit. Asperiores quia esse sed! Repellat, sit repellendus hic quam eius molestias optio repudiandae modi reprehenderit et vero libero dolores ullam assumenda mollitia eum magni magnam, amet ipsa. Cumque quaerat corrupti deserunt quam tenetur repudiandae, hic quod, ipsum quia illo natus quae maxime nobis vero. Veritatis deserunt provident error culpa repellat in odio, architecto ab quia a obcaecati eos esse quod quidem? Repellat sed aliquid enim labore magnam dolorem minima exercitationem perferendis totam blanditiis, corrupti impedit sunt nemo! Maxime unde voluptatem non. Consequatur, id. Eligendi commodi amet, accusantium accusamus doloribus sunt aspernatur cupiditate aperiam rem tempora ipsum quia facilis ducimus molestiae. Non neque in iusto deserunt dolores maiores nisi ratione fugit. Cum dolorem ad eius rerum omnis, eligendi explicabo odit praesentium fuga, veritatis maiores officia consequuntur ut repudiandae. Iste dolores saepe, necessitatibus doloremque, nisi inventore praesentium soluta fugiat esse asperiores veritatis debitis molestias quam ducimus molestiae totam quisquam a corporis facilis. Itaque voluptatibus dolor perferendis nam eveniet molestias ea sint.";

function addItem() {
    var el = document.getElementsByClassName("grid-container")[0];
    itemCounter++;

    var itm = document.createElement('div');
    itm.id = `item-${itemCounter}`;
    itm.className = `item  item-${itemCounter}`;
    var chunkSize = Math.ceil(0.5 + Math.random() * 3);
    var textLen = "xxx";
    if (chunkSize == 1) {
        textLen =  5 + Math.ceil(Math.random() *   20);
    } else if (chunkSize == 2) {
        textLen =  80 + Math.ceil(Math.random() * 120);
    } else {
        textLen = 160 + Math.ceil(Math.random() * 280);        
    }

    itm.innerHTML  = `${itemCounter}. `; 
    itm.innerHTML += `<a href="" onclick="addItemRowCol(this,'row');return false;">+R</a> `;
    itm.innerHTML += `<a href="" onclick="addItemRowCol(this,'col');return false;">+C</a> `;
    itm.innerHTML += `<a href="" onclick="removeItem(this);         return false;">(-)</a> `;
    itm.innerHTML += `<br>`;
    itm.innerHTML += lorem.substring(0, textLen);

    el.appendChild(itm);

    console.log("fine", itm.className);
}


function incSpan(arg) {
    if (arg == "") {
        return "span 2";
    }

    var arr1 = arg.split(` `);
    if (arr1.length != 2) {
        return "span 2";        
    }

    argStr = arr1[1];
    var argInt = parseInt(argStr);
    argInt++
    return `span ${argInt}`;
}


function addItemRowCol(srcA,rowCol) {
    var par = srcA.parentNode;
    if (rowCol == 'row') {
        par.style["grid-row-end"] = incSpan(par.style["grid-row-end"]); 
    }
    if (rowCol == 'col') {
        par.style["grid-column-end"] = incSpan(par.style["grid-column-end"]); 
    }
}

function removeItem(srcA) {
    var par = srcA.parentNode;
    par.remove();
}




function createCSSClass(srcInp, cssProperty) {
    var newClass = `.${cssProperty} {  ${cssProperty}: ${srcInp.value};  }`;
    addReplaceCSSClass(`.${cssProperty}`, newClass);
    var el = document.getElementsByClassName("grid-container")[0];
    el.classList.add(`${cssProperty}`);  // add, remove, toggle, contains, replace   
}


var dynStyleEl       = document.createElement('style');
dynStyleEl.innerHTML = "";


function addReplaceCSSClass(prefix, newClass) {
    var arr1 = dynStyleEl.innerHTML.split(`\n`);
    var found = false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].startsWith(prefix)) {
            found = true;
            arr1[i] = newClass;     
            console.log("replaced", i, newClass);
            break;
        }
    }
    var newInner = arr1.join(`\n`)
    if (!found) {
        newInner += newClass + `\n`;
        console.log("appended  ", newClass);
    }
    dynStyleEl.innerHTML = newInner;
}


function onBodyLoad() {
    console.log("on body load start");    
    
    document.getElementById("ui01").focus();

    document.body.appendChild(dynStyleEl);    


    console.log("on body load end");    
}
