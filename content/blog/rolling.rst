Rolling
#######
:date: 2010-08-03 04:25
:author: Admin
:category: Processing


.. image:: /img/blog/2010/08/blackorwhite.gif
    :alt: animated gif

--------------

.. gist:: drart/8461515 Rolling.pde processing


.. raw:: html -- terrible hack for now

    <script src="/theme/js/prism.js"></script>

    <script>
    let codes = document.getElementsByTagName("pre");
    for( let i = 0; i < codes.length; i++){
        codes[i].innerHTML = Prism.highlight(codes[i].innerText, Prism.languages.processing);
    }
    </script>
