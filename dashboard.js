//var user = sessionStorage.getItem("username");
//document.getElementById("username").innerHTML= user;
var array = JSON.parse(localStorage.getItem("data"));

var actions = '<button class="btn btn-primary"onEdit(this)">Edit</button> <button class="btn btn-primary" onClick="onDelete(this)">Delete</button>';

var content = document.getElementById("tbody");
array.forEach(element => {
   
   var newrow = content.insertRow();
   var i = 0;
   //var cell = newrow.insertCell(0);
   //cell.innerHTML = element.id;
   var cell = newrow.insertCell(0);
   cell.innerHTML = element.email;
   var cell = newrow.insertCell(1);
   cell.innerHTML = element.username;
   var cell = newrow.insertCell(2);
   cell.innerHTML = element.mobile;
   var cell = newrow.insertCell(3);
   cell.innerHTML = '<button class="btn btn-primary" onclick="onEdit(this)">Edit</button> <button class="btn btn-danger" onClick="onDelete(this)">Delete</button>';
});

onShow = () => {
   document.getElementById("table").style.visibility = "visible";
}

onHidden = () => {
   document.getElementById("action").style.display = "none";
}
// edit 
onEdit = (t) => {
   document.getElementById("action").style.display = "block";
   
   rowindex = t.parentNode.parentNode.rowIndex;

   selectedrow = (t.parentNode.parentNode.rowIndex) - 1;
      document.getElementById("email").value = array[selectedrow].email;
                document.getElementById("uname").value = array[selectedrow].username;
                document.getElementById("phoneNo").value = array[selectedrow].mobile;
                
}             
      
   
   

// update
upDate = () => {
   var a = 0;
   array = JSON.parse(localStorage.getItem("data"));
   var email = document.getElementById("email").value.trim();
   var username = document.getElementById("uname").value.trim();
   var mobile = document.getElementById("phoneNo").value.trim();

   array.forEach(element => {
      if (a === selectedrow) {
         element.email = email;
         element.username = username;
         element.mobile = mobile;
         var change = document.getElementById("table").rows[rowindex].cells;
         change[0].innerHTML = element.email;
         console.log(change[1]);
         change[1].innerHTML = element.username;
         change[2].innerHTML = element.mobile;
         localStorage.setItem("data", JSON.stringify(array));
         alert("Updated")
      }
      a++;
   });

   document.getElementById("action").style.display = "none";
   document.getElementById("table").style.visibility = "visible";

}

// delete 
onDelete = (t) => {


   array = JSON.parse(localStorage.getItem("data"));
   rowindex = t.parentNode.parentNode.rowIndex;
   selectedrow = (t.parentNode.parentNode.rowIndex) - 1;

   if (confirm("Do you want to delete this record") === true) {
      array.splice(selectedrow, 1);
      localStorage.setItem("data", JSON.stringify(array));
      document.getElementById("table").deleteRow(rowindex);
   }

}
// serach 
const serach = () => {
   filter = document.getElementById('myInput').value.toUpperCase();
   table = document.getElementById('table');

   tr = table.getElementsByTagName('tr');
   for (var i = 1; i < tr.length; i++) {
      //let td= tr[i].getElementsByTagNames('td')[0];
      let td = document.getElementById("table").rows[i].cells[0];
      if (td) {
         let textvalue = td.content || td.innerHTML;

         if (textvalue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            // document.getElementById("table").style.visibility = "visible";
         }
         else {
            tr[i].style.display = "none";
         }
      }
   }

}

// pagination

var tbody = document.querySelector("tbody");
console.log("Tbody: ", tbody);
var pageUl = document.querySelector(".pagination");
var itemShow = document.querySelector("#itemperpage");
var tr = tbody.querySelectorAll("tr");

var emptyBox = [];
var index = 1;
var itemparpage = 5;

givetrperpage = () => {
   itemparpage = Number(this.value)
   displayPage(itemparpage);
   pageGenerater(itemparpage);
   getElement(itemparpage);
}

for (let i=0; i < tr.length; i++) {
   emptyBox.push(tr[i]);
}
itemShow.onchange = givetrperpage;
console.log("Emoty Box: ", emptyBox);

displayPage = (limit) => {
   // tbody.innerHTML = '';
   for (let i = 0; i < limit; i++) {
      tbody.appendChild(emptyBox[i]);
   }
   const pageNum = pageUl.querySelectorAll(".list");
   pageNum.forEach(n => n.remove());
}
displayPage(itemparpage);

pageGenerater = (getItem) => {
   const num_of_tr = emptyBox.length;
   if (num_of_tr <= getItem) {
      pageUl.style.display = "none"
   }
   else {
      pageUl.style.display = "flex"
      const num_of_page = Math.ceil(num_of_tr / getItem);
      for (let i = 1; i <= num_of_page; i++) {
         const li = document.createElement('li');
         li.className = 'list';
         const a = document.createElement('a')
         a.href = "#";
         a.innerText = i;
         a.setAttribute('data-page', i)
         li.appendChild(a);
         pageUl.insertBefore(li, pageUl.querySelector(".next"));
      }
   }
}

pageGenerater(itemparpage);
let pageLink = pageUl.querySelectorAll('a');
let lastPage = pageLink.length - 2;

pageRunner = (page, items, lastPage, active) => {
   for (button of page) {
      button.onclick = e => {
         const page_num = e.target.getAttribute("data-page");
         const page_mover = e.target.getAttribute("id");
         if (page_num != null) {
            index = page_num;
         } else {
            if (page_mover === "next") {
               index++
               if (index >= lastPage) {
                  index = lastPage;
               }
            } else {
               index--;
               if (index <= 1) {
                  index = 1;
               }
            }
         }
         pageMaker(index, items, active);
      }
   }

}

var pageli = pageUl.querySelectorAll(".list");
pageli[0].classList.add("active");
pageRunner(pageLink, itemparpage, lastPage, pageli);

getElement = (val) => {
   let pageLink = pageUl.querySelectorAll("a");
   let lastPage = pageLink.length - 2;
   let pageli = pageUl.querySelectorAll(".list");
   pageli[0].classList.add("active");
   pageRunner(pageLink, val, lastPage, pageli);
}

pageMaker = (index, item_per_page, activePage) => {
   const start = item_per_page * index;
   const end = start + item_per_page;
   const current_page = emptyBox.slice((start - item_per_page), (end - item_per_page));

   tbody.innerHTML = '';
   for (let i = 0; i < current_page.length; i++) {
      let item = current_page[i];
      tbody.appendChild(item);

   }
   Array.from(activePage).forEach((e) => {
      e.classList.remove("active");
   });
   activePage[index - 1].classList.add("active");
}
