(function(){ 

    var menuitems = document.querySelectorAll('#menumenu > li:not(#blogtitle)');
    var bloglinks = document.querySelectorAll(".menu-category li");
    var blogcategories = document.querySelectorAll('#menu-categories > li');

    function setupmenu(){

        for (var i = 0; i < menuitems.length; i++){
            menuitems[i].hidden = false;
        }
    
        for (var i = 0; i < bloglinks.length; i++){
            bloglinks[i].hidden = true;
        }
    
        for (var i = 0; i < blogcategories.length; i++){
            blogcategories[i].hidden = false;
        }

        document.getElementById("menu-categories").hidden = true;

        document.getElementById('blogtitle').querySelector('a').onclick = function(e){
            e.preventDefault();
            e.stopPropagation();

            document.getElementById("menu-categories").hidden = false;

            for (var i = 0; i < menuitems.length; i++){
                menuitems[i].hidden = true; 
            }

            this.onclick = function(e){}; // reset the link click
        };

        var tada =  document.querySelectorAll('.menu-category > a') ;
        for (var i = 0; i < tada.length; i++){
            tada[i].onclick = function(index){
                return function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var mybloglinks = blogcategories[index].querySelectorAll('ul > li');

                    for ( var j = 0; j < mybloglinks.length; j++){
                        mybloglinks[j].hidden = false;
                    }

                    for ( var k = 0; k < blogcategories.length; k++){
                        if (k !== index) {
                            blogcategories[k].hidden = true;
                        }else{
                            blogcategories[k].hidden = false;
                        }
                    }
                    this.onclick = function(e){};
                };
            }(i);
        }


        window.openNav = function() {
            document.getElementById("myNav").style.height = "100%";
        };

        window.closeNav = function() {
            document.getElementById("myNav").style.height = "0%";
            setTimeout(setupmenu, 505);
        };

        document.onkeyup = function(e){
            if( e.keyCode === 27){
                closeNav();
            }
        };
    };

    setupmenu();
})();
