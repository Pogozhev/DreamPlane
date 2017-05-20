(function(){
    require('./sass/_demo.scss');

    var app = document.getElementById('app'),
        svgns = "http://www.w3.org/2000/svg",
        deviceToggle = document.createElement('div'),
        devicePreview = document.createElementNS(svgns, 'svg'),
        devicePath = document.createElementNS(svgns, 'path');

    // Device design
    devicePath.setAttribute('d', 'M353.64 0H74.37a68.13 68.13 0 0 0-68 68v716a68.13 68.13 0 0 0 68 68h279.27a68.13 68.13 0 0 0 68-68V68a68.13 68.13 0 0 0-68-68zm65 784a65 65 0 0 1-65 65H74.37a65 65 0 0 1-65-65V68a65 65 0 0 1 65-65h279.27a65 65 0 0 1 65 65zM215 774.9a31.13 31.13 0 1 0 31.13 31.1A31.13 31.13 0 0 0 215 774.9zm0 59.25A28.13 28.13 0 1 1 243.13 806 28.16 28.16 0 0 1 215 834.15zM1.86 252.4h2.8v53.53h-2.8A1.86 1.86 0 0 1 0 304.07v-49.82a1.86 1.86 0 0 1 1.86-1.86zm0-65.9h2.8V240h-2.8A1.86 1.86 0 0 1 0 238.18v-49.82a1.86 1.86 0 0 1 1.86-1.86zm0-61.78h2.8v30.9h-2.8A1.86 1.86 0 0 1 0 153.74v-27.17a1.86 1.86 0 0 1 1.86-1.86zM428 188.36v49.82a1.86 1.86 0 0 1-1.86 1.86h-2.8V186.5h2.8a1.86 1.86 0 0 1 1.86 1.86zM249.6 48.93v.75a3.4 3.4 0 0 1-3.38 3.4h-63.36a3.38 3.38 0 0 1-3.4-3.4v-.75a3.38 3.38 0 0 1 3.4-3.4h63.36a3.4 3.4 0 0 1 3.4 3.4zm-95.5.38a7.38 7.38 0 1 1-7.4-7.37 7.38 7.38 0 0 1 7.38 7.38zm55.52-31.44a4.92 4.92 0 1 1 4.92 4.92 4.92 4.92 0 0 1-4.92-4.92z');
    devicePreview.classList.add('device_mockup');
    devicePreview.setAttribute('viewBox', '0 0 428 852');
    
    // Device toggler
    deviceToggle.id = 'toggle-device';
    deviceToggle.innerHTML = 'Режим';
    deviceToggle.addEventListener('click', function(){
       app.classList.toggle('device'); 
    });   

    // Render
    app.classList.add('device');
    devicePreview.appendChild(devicePath);
    app.appendChild(devicePreview);
    document.body.appendChild(deviceToggle);
})();


