const setFeatureByPath = (path, value) => { let obj = window; const parts = path.split('.'); while (parts.length > 1) obj = obj[parts.shift()]; obj[parts[0]] = value; }

function addFeature(features) {
    const feature = document.createElement('feature');
    features.forEach(attribute => {
        let element = attribute.type === 'nonInput' ? document.createElement('label') : document.createElement('input');
        if (attribute.type === 'nonInput') element.innerHTML = attribute.name;
        else { element.type = attribute.type; element.id = attribute.name; }

        if (attribute.attributes) {
            attribute.attributes.split(' ').map(attr => attr.split('=')).forEach(([key, value]) => {
                value = value ? value.replace(/"/g, '') : '';
                key === 'style' ? element.style.cssText = value : element.setAttribute(key, value);
            });
        }

        if (attribute.variable) element.setAttribute('setting-data', attribute.variable);
        if (attribute.dependent) element.setAttribute('dependent', attribute.dependent);
        if (attribute.className) element.classList.add(attribute.className);

        if (attribute.labeled) {
            const label = document.createElement('label');
            if (attribute.className) label.classList.add(attribute.className);
            if (attribute.attributes) {
                attribute.attributes.split(' ').map(attr => attr.split('=')).forEach(([key, value]) => {
                    value = value ? value.replace(/"/g, '') : '';
                    key === 'style' ? label.style.cssText = value : label.setAttribute(key, value);
                });
            }
            label.innerHTML = `${element.outerHTML} ${attribute.label}`;
            feature.appendChild(label);
        } else {
            feature.appendChild(element);
        }
    });
    dropdownMenu.innerHTML += feature.outerHTML;
}

function handleInput(ids, callback = null) {
    (Array.isArray(ids) ? ids.map(id => document.getElementById(id)) : [document.getElementById(ids)])
    .forEach(element => {
        if (!element) return;
        const setting = element.getAttribute('setting-data'),
            dependent = element.getAttribute('dependent'),
            handleEvent = (e, value) => {
                setFeatureByPath(setting, value);
                if (callback) callback(value, e);
            };

        if (element.type === 'checkbox') {
            element.addEventListener('change', (e) => {
                playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/5os0bypi.wav');
                handleEvent(e, e.target.checked);
                if (dependent) dependent.split(',').forEach(dep => 
                    document.querySelectorAll(`.${dep}`).forEach(depEl => 
                        depEl.style.display = e.target.checked ? null : "none"));
            });
        } else {
            element.addEventListener('input', (e) => handleEvent(e, e.target.value));
        }
    });
}

/* Watermark - Estilo Moderno */
Object.assign(watermark.style, {
    position: 'fixed',
    top: '15px',
    left: '85%',
    width: '160px',
    height: '36px',
    backgroundColor: 'rgba(15, 15, 20, 0.85)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    color: 'white',
    fontSize: '15px',
    fontFamily: '"Segoe UI", system-ui, sans-serif',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'default',
    userSelect: 'none',
    padding: '0 12px',
    borderRadius: '12px',
    zIndex: '1001',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
});

if (device.mobile) watermark.style.left = '55%';

// Nome com animação RGB limpa e versão discreta
watermark.innerHTML = `
    <span id="khanCheetusName" style="font-weight: 600; letter-spacing: 0.3px;">Khan Cheetus</span>
    <span style="color: rgba(255,255,255,0.5); font-size:11px; font-weight:400">${ver}</span>
`;

document.body.appendChild(watermark);

/* Dropdown Menu - Estilo Premium */
Object.assign(dropdownMenu.style, {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: '0',
    width: '240px',
    backgroundColor: 'rgba(15, 15, 20, 0.9)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '14px',
    color: 'white',
    fontSize: '13px',
    fontFamily: '"Segoe UI", system-ui, sans-serif',
    display: 'none',
    flexDirection: 'column',
    zIndex: '1000',
    padding: '12px',
    cursor: 'default',
    userSelect: 'none',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
});

dropdownMenu.innerHTML = `
    <style>
        /* Animação RGB suave */
        @keyframes rgbColorShift {
            0% { color: #6bb9ff; }   /* Azul claro */
            25% { color: #9bff9b; }  /* Verde pastel */
            50% { color: #ff9bff; }  /* Rosa */
            75% { color: #ffcc6b; }  /* Laranja claro */
            100% { color: #6bb9ff; }
        }
        #khanCheetusName {
            animation: rgbColorShift 8s infinite ease;
        }

        /* Switches Modernos */
        input[type="checkbox"] {
            appearance: none;
            position: relative;
            width: 40px;
            height: 22px;
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 11px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-right: 10px;
        }
        input[type="checkbox"]::before {
            content: '';
            position: absolute;
            top: 2px;
