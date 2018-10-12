//console.log ("Hello from JavaScript");


// Event Listener for Submit
document.querySelector("#myForm").addEventListener("submit", saveBookmark);

// Event Listener for filter
document.querySelector("#filter").addEventListener("keyup", filterBookmarks);

// Filter Bookmarks
function filterBookmarks (){
    //console.log ("hello for filter");
    let filterValue = document.querySelector("#filter").value.toUpperCase();
    //console.log(filterValue);
    var bookmarkNames = document.querySelectorAll(".name");
    // console.log(bookmarkNames);

    for (var i = 0 ; i < bookmarkNames.length ; i++) {
        var name = bookmarkNames[i].textContent.toUpperCase();
        // console.log(name);
        if (name.includes(filterValue)) {
            bookmarkNames[i].parentElement.style.display = "block";
        } else {
            bookmarkNames[i].parentElement.style.display = "none";
        }
    }
}

//Save Bookmark Function
function saveBookmark(e){
    event.preventDefault();
    //console.log ("Hello from saveBookmark");

    //get user input
    var siteName = document.querySelector('#siteName').value;
    //console.log (siteName)

    var siteUrl = document.getElementById('siteUrl').value;
    //console.log (siteUrl);

    //Create object for Bookamark
    var bookmark = {
        name: siteName,
        site: siteUrl
    };

    // Check if name or url is empty
    if (siteName === "" || siteUrl === ""){
        alert("Site name and url cannot be empty");
        return false;
    }
    
    //console.log (bookmark);

    // localStorage.setItem("test", "Hello World")
    //console.log(localStorage.getItem("test"));

    // store bookmarks array into local storage
    //check if the bookmark array exist or not

    if (localStorage.getItem("bookmarks") === null){
        //init bookamarks array
        var bookmarks = [];
        //add new bookmark into the array
        bookmarks.push(bookmark);
        //set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add new bookmarks into bookmarks
        bookmarks.push(bookmark);
        //reset the bookmarks to localStorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    document.querySelector('#myForm').reset();

    fetchBookmarks();
}


function fetchBookmarks () {
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //Get the output div by Id
    var bookmarksResult = document.querySelector('#bookmarksResult');

    //console.log (bookmarksResult);

    //Reset the output div
    bookmarksResult.innerHTML = "";

    //Loop through bookmarks
    for(var i=0 ; i < bookmarks.length ; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].site;

        // Create a div
        var div = document.createElement('div');
        // Create h3
        var h3 = document.createElement("h3");
        h3.textContent = name;
        h3.className = "name";
        // Create link
        var a = document.createElement("a");
        a.href = url;
        a.className = "btn btn-success";
        a.textContent = "Visit";
        
        // Create button
        var button = document.createElement("button");
        button.className = "btn btn-danger";
        button.textContent = "Delete";
        button.addEventListener("click", function(e){
            var siteName = e.target.parentElement.children[0].textContent;
            deleteBookmark(siteName);
        });

        div.appendChild(h3);
        div.appendChild(a);
        div.appendChild(button);
        bookmarksResult.append(div);

        // bookmarksResult.innerHTML +=
        // '<div>' +
        //     '<h3>' +
        //         name + ' ' +
        //             '<a class="btn btn-success" href="'+url+ '">Visit</a> ' +
        //             '<button class="btn btn-danger" onclick="deleteBookmark(\''+name+'\')">Delete</button>' +
        //     '</h3>' +
        // '</div>'
    }
}

function deleteBookmark(name) {
    //console.log (name)

    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    //loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++){
        //remove the bookmark with the given name
        if (bookmarks[i].name === name){
            bookmarks.splice(i, 1);
            break;
        }
    }
    //reset bookmarks back to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    // Re-fetch bookmarks Results
    fetchBookmarks();
}