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

/* Watermark */
Object.assign(watermark.style, {
    position: 'fixed', 
    top: '0', 
    left: '85%', 
    width: '50px', // largura do quadrado
    height: '50px', // altura do quadrado
    backgroundColor: 'RGB(0,0,0,0.5)',
    display: 'flex', 
    justifyContent: 'center', // centraliza o conteúdo
    alignItems: 'center', // centraliza o conteúdo
    cursor: 'default', 
    userSelect: 'none', 
    padding: '0', // remove o espaço interno
    borderRadius: '10px', // bordas arredondadas
    zIndex: '1001', 
    transition: 'transform 0.3s ease'
});

if (device.mobile) watermark.style.left = '55%'

watermark.innerHTML = `
    <img src="https://raw.githubusercontent.com/Ryumargin/KhanPchan/refs/heads/main/functions/icon/pngwing.com.png" 
         alt="PChan Icon" 
         style="width: 40px; height: 40px;"/> <!-- Ajuste o tamanho da imagem conforme necessário -->
`;

document.body.appendChild(watermark);

let isDragging = false, offsetX, offsetY;

watermark.addEventListener('mousedown', e => { if (!dropdownMenu.contains(e.target)) { isDragging = true; offsetX = e.clientX - watermark.offsetLeft; offsetY = e.clientY - watermark.offsetTop; watermark.style.transform = 'scale(0.9)'; } });
watermark.addEventListener('mouseup', () => { isDragging = false; watermark.style.transform = 'scale(1)'; });

document.addEventListener('mousemove', e => { if (isDragging) { let newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - watermark.offsetWidth)); let newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - watermark.offsetHeight)); Object.assign(watermark.style, { left: `${newX}px`, top: `${newY}px` }); dropdownMenu.style.display = 'none'; } });

/* Dropdown */
Object.assign(dropdownMenu.style, {
    position: 'absolute', top: '100%', left: '0', width: '160px', backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: '10px', color: 'white', fontSize: '13px', fontFamily: 'Monospace, sans-serif',
    display: 'none', flexDirection: 'column', zIndex: '1000', padding: '5px', cursor: 'default',
    userSelect: 'none', transition: 'transform 0.3s ease', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)'
});

Object.assign(dropdownMenu.style, {
    position: 'absolute', top: '100%', left: '0', width: '220px', // Aumentado a largura
    backgroundColor: 'rgba(0,0,0,0.7)', // Mais transparente
    borderRadius: '15px', // Mais arredondado
    color: 'white', fontSize: '13px', fontFamily: 'Monospace, sans-serif',
    display: 'none', flexDirection: 'column', zIndex: '1000', padding: '10px', // Aumentado o padding
    cursor: 'default', userSelect: 'none', transition: 'transform 0.3s ease, background-color 0.3s ease', // Adicionado transição para background
    backdropFilter: 'none'
});

dropdownMenu.innerHTML = `
    <style>
        /* Animação RGB para o nome Khan Cheetus */
        @keyframes rgbColorShift {
            0% { color: rgb(255, 0, 0); }
            16% { color: rgb(255, 255, 0); }
            33% { color: rgb(0, 255, 0); }
            50% { color: rgb(0, 255, 255); }
            66% { color: rgb(0, 0, 255); }
            83% { color: rgb(255, 0, 255); }
            100% { color: rgb(255, 0, 0); }
        }
        #khanCheetusName {
            animation: rgbColorShift 5s infinite linear;
        }

        /* Estilo de switch para checkboxes */
        input[type="checkbox"] {
            appearance: none;
            position: relative;
            width: 38px; /* Largura do switch */
            height: 20px; /* Altura do switch */
            background-color: #3a3a3b;
            border: 1px solid #acacac;
            border-radius: 10px; /* Metade da altura para ser oval */
            cursor: pointer;
            transition: background-color 0.3s, border-color 0.3s;
            margin-right: 10px; /* Espaçamento */
        }
        input[type="checkbox"]::before {
            content: '';
            position: absolute;
            top: 1px;
            left: 1px;
            width: 16px; /* Tamanho do "slider" */
            height: 16px; /* Tamanho do "slider" */
            background-color: #fff;
            border-radius: 50%;
            transition: transform 0.3s;
        }
        input[type="checkbox"]:checked {
            background-color: #ffa500; /* Cor quando ativado */
            border-color: #ffa500;
        }
        input[type="checkbox"]:checked::before {
            transform: translateX(18px); /* Move o slider para a direita */
        }

        /* Estilo para input[type="text"], input[type="number"] */
        input[type="text"], input[type="number"] {
            width: calc(100% - 10px);
            border: 1px solid #ffa500;
            color: white;
            padding: 3px;
            border-radius: 3px;
            background: none; /* Fundo transparente */
        }

        /* NOVO ESTILO PARA A SEEKBAR (input[type="range"]) */
        }
        
/* NOVO ESTILO PARA A SEEKBAR (input[type="range"]) */
input[type="range"] {
    -webkit-appearance: none; /* Remove a aparência padrão do navegador */
    width: calc(100% - 10px); /* Ajusta a largura */
    height: 20px; /* Barra mais alta, conforme o novo estilo */
    background: #3a3a3b; /* Cor de fundo da trilha (cinza escuro como o checkbox desativado) */
    border-radius: 50px; /* Bordas mais arredondadas, conforme o novo estilo */
    outline: none; /* Remove o contorno ao focar */
    transition: background-color 0.3s ease; /* Transição suave para a cor de fundo */
    margin-top: 5px; /* Espaçamento superior */
    accent-color: #ffa500; /* Cor do preenchimento da barra (para navegadores que suportam) */
    padding: 0; /* Remove padding, conforme o novo estilo */
}

/* Estilo do "thumb" (o controle deslizante) para Webkit (Chrome, Safari) */
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; /* Remove a aparência padrão */
    width: 18px; /* Largura do thumb, conforme o novo estilo */
    height: 18px; /* Altura do thumb, conforme o novo estilo */
    border-radius: 50%; /* Torna o thumb circular */
    background: #ffa500; /* Cor laranja como o checkbox ativado (mantido do original) */
    cursor: grab; /* Cursor de arrastar */
    box-shadow: 0 2px 5px rgba(0,0,0,0.5); /* Sombra para dar profundidade, conforme o novo estilo */
    margin-top: -6px; /* Ajusta a posição vertical do thumb */
    transition: all 0.2s ease; /* Transições suaves, conforme o novo estilo */
    border: 1px solid #ffa500; /* Borda para combinar com o checkbox */
}

input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1); /* Pequeno aumento ao passar o mouse, conforme o novo estilo */
    box-shadow: 0 4px 8px rgba(255, 165, 0, 0.6); /* Sombra ao passar o mouse, com cor laranja */
}

input[type="range"]::-webkit-slider-thumb:active {
    cursor: grabbing; /* Cursor ao arrastar */
    transform: scale(1.1); /* Pequeno aumento ao arrastar */
}

/* Estilo do "thumb" (o controle deslizante) para Firefox */
input[type="range"]::-moz-range-thumb {
    width: 18px; /* Largura do thumb, conforme o novo estilo */
    height: 18px; /* Altura do thumb, conforme o novo estilo */
    border-radius: 50%; /* Torna o thumb circular */
    background: #ffa500; /* Cor laranja como o checkbox ativado (mantido do original) */
    cursor: grab; /* Cursor de arrastar */
    box-shadow: 0 2px 5px rgba(0,0,0,0.5); /* Sombra para dar profundidade, conforme o novo estilo */
    border: 1px solid #ffa500; /* Borda para combinar com o checkbox */
    transition: all 0.2s ease; /* Transições suaves, conforme o novo estilo */
}

input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.1); /* Pequeno aumento ao passar o mouse, conforme o novo estilo */
    box-shadow: 0 4px 8px rgba(255, 165, 0, 0.6); /* Sombra ao passar o mouse, com cor laranja */
}

input[type="range"]::-moz-range-thumb:active {
    cursor: grabbing; /* Cursor ao arrastar */
    transform: scale(1.1); /* Pequeno aumento ao arrastar */
}

/* Estilo da trilha preenchida (para navegadores que não suportam accent-color) */
input[type="range"]::-webkit-slider-runnable-track {
    background: linear-gradient(to right, #ffa500 var(--range-progress, 50%), #3a3a3b var(--range-progress, 50%));
    border-radius: 50px; /* Bordas mais arredondadas, conforme o novo estilo */
    height: 20px; /* Altura da barra, conforme o novo estilo */
}
input[type="range"]::-moz-range-track {
    background: #3a3a3b;
    border-radius: 50px; /* Bordas mais arredondadas, conforme o novo estilo */
    height: 20px; /* Altura da barra, conforme o novo estilo */
}
input[type="range"]::-moz-range-progress {
    background-color: #ffa500;
    border-radius: 50px; /* Bordas mais arredondadas, conforme o novo estilo */
    height: 20px; /* Altura da barra, conforme o novo estilo */
}

        label {display: flex; align-items: center; color: #ccc; padding-top: 5px; padding-bottom: 5px; border-bottom: 1px solid rgba(255,255,255,0.1);} /* Ajustado cor do texto e borda */
        label:last-of-type { border-bottom: none; } /* Remove a borda do último item */
    </style>
`;

watermark.appendChild(dropdownMenu);

let featuresList = [
    { name: 'questionSpoof', type: 'checkbox', variable: 'features.questionSpoof', attributes: 'checked', labeled: true, label: 'Question Spoof' },
    { name: 'videoSpoof', type: 'checkbox', variable: 'features.videoSpoof', attributes: 'checked', labeled: true, label: 'Video Spoof' },
    { name: 'showAnswers', type: 'checkbox', variable: 'features.showAnswers', labeled: true, label: 'Answer Revealer' },
    { name: 'autoAnswer', type: 'checkbox', variable: 'features.autoAnswer', dependent: 'autoAnswerDelay,nextRecomendation,repeatQuestion', labeled: true, label: 'Auto Answer' },
    { name: 'repeatQuestion', className: 'repeatQuestion', type: 'checkbox', variable: 'features.repeatQuestion', attributes: 'style="display:none;"', labeled: true, label: 'Repeat Question' },
    { name: 'nextRecomendation', className: 'nextRecomendation', type: 'checkbox', variable: 'features.nextRecomendation', attributes: 'style="display:none;"', labeled: true, label: 'Recomendations' },
    { name: 'autoAnswerDelay', className: 'autoAnswerDelay', type: 'range', variable: 'features.autoAnswerDelay', attributes: 'style="display:none;" min="1" max="3" value="1"', labeled: false },
    { name: 'minuteFarm', type: 'checkbox', variable: 'features.minuteFarmer', labeled: true, label: 'Minute Farmer' },
    { name: 'customBanner', type: 'checkbox', variable: 'features.customBanner', labeled: true, label: 'Custom Banner' },
    { name: 'rgbLogo', type: 'checkbox', variable: 'features.rgbLogo', labeled: true, label: 'RGB Logo' },
    { name: 'darkMode', type: 'checkbox', variable: 'features.darkMode', attributes: 'checked', labeled: true, label: 'Dark Mode' },
    { name: 'onekoJs', type: 'checkbox', variable: 'features.onekoJs', labeled: true, label: 'onekoJs' },
    { name: 'Custom Username', type: 'nonInput' },
    { name: 'customName', type: 'text', variable: 'featureConfigs.customUsername', attributes: 'autocomplete="off"' },
    { name: 'Custom pfp', type: 'nonInput' },
    { name: 'customPfp', type: 'text', variable: 'featureConfigs.customPfp', attributes: 'autocomplete="off"' }
  ];
  

featuresList.push({ name: `${user.username} - UID: ${user.UID}`, type: 'nonInput', attributes: 'style="font-size:10px;"padding-left:5px;' });

addFeature(featuresList);

handleInput(['questionSpoof', 'videoSpoof', 'showAnswers', 'nextRecomendation', 'repeatQuestion', 'minuteFarm', 'customBanner', 'rgbLogo']);
handleInput(['customName', 'customPfp'])
handleInput('autoAnswer', checked => checked && !features.questionSpoof && (document.querySelector('[setting-data="features.questionSpoof"]').checked = features.questionSpoof = true));
handleInput('autoAnswerDelay', value => value && (featureConfigs.autoAnswerDelay = 4 - value));
handleInput('darkMode', checked => checked ? (DarkReader.setFetchMethod(window.fetch), DarkReader.enable()) : DarkReader.disable());
handleInput('onekoJs', checked => { onekoEl = document.getElementById('oneko'); if (onekoEl) {onekoEl.style.display = checked ? null : "none"} });

watermark.addEventListener('mouseenter', () => { dropdownMenu.style.display = 'flex'; playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav'); } );
watermark.addEventListener('mouseleave', e => { !watermark.contains(e.relatedTarget) && (dropdownMenu.style.display = 'none'); playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav'); });
