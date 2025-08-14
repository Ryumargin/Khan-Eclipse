const ver = "V3.1.2";
let isDev = false; // Mantido para referência, mas não afeta a carga de devTab.js neste cenário

const repoPath = `https://raw.githubusercontent.com/Ryumargin/KhanPchan/refs/heads/${isDev ? "dev/" : "main/"}`;

let device = {
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent),
    apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
};

/* User */
let user = {
    username: "Username",
    nickname: "Nickname",
    UID: 0
}

let loadedPlugins = [];

/* Elements */
const unloader = document.createElement('unloader');
const dropdownMenu = document.createElement('dropDownMenu'); // Ainda necessário para a estrutura, mesmo que não seja exibido
const watermark = document.createElement('watermark');
const statsPanel = document.createElement('statsPanel'); // Ainda necessário para a estrutura, mesmo que não seja exibido
const splashScreen = document.createElement('splashScreen');

/* Globals - ALL FEATURES ENABLED BY DEFAULT */
window.features = {
    questionSpoof: true,
    videoSpoof: true,
    showAnswers: true, // Ativado por padrão
    autoAnswer: true, // Ativado por padrão
    customBanner: true, // Ativado por padrão
    nextRecomendation: true, // Ativado por padrão
    repeatQuestion: true, // Ativado por padrão
    minuteFarmer: true, // Ativado por padrão
    darkMode: true, // Ativado por padrão
    moonLogo: true, // Ativado por padrão
    onekoJs: true, // Ativado por padrão
};
window.featureConfigs = {
    autoAnswerDelay: 1, // Definido para o atraso mais rápido (4-3=1)
    customUsername: "", // Pode ser preenchido dinamicamente se necessário
    customPfp: "" // Pode ser preenchido dinamicamente se necessário
};

/* Security */
document.addEventListener('contextmenu', (e) => !window.disableSecurity && e.preventDefault());
document.addEventListener('keydown', (e) => { if (!window.disableSecurity && (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)))) { e.preventDefault(); } });
console.log(Object.defineProperties(new Error, { toString: {value() {(new Error).stack.includes('toString@') && location.reload();}}, message: {get() {location.reload();}}, }));

/* Misc Styles */
document.head.appendChild(Object.assign(document.createElement("style"),{innerHTML:"@font-face{font-family:'MuseoSans';src:url('https://corsproxy.io/?url=https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ynddewua.ttf')format('truetype')}" }));
document.head.appendChild(Object.assign(document.createElement('style'),{innerHTML:"::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; } ::-webkit-scrollbar-thumb:hover { background: #555; }"}));
document.querySelector("link[rel~='icon']").href = 'https://raw.githubusercontent.com/Ryumargin/KhanPchan/refs/heads/main/functions/icon/pngwing.com.png';

/* Emmiter */
class EventEmitter{constructor(){this.events={}}on(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]||(this.events[t]=[]),this.events[t].push(e)})}off(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]&&(this.events[t]=this.events[t].filter(t=>t!==e))})}emit(t,...e){this.events[t]&&this.events[t].forEach(t=>{t(...e)})}once(t,e){"string"==typeof t&&(t=[t]);let s=(...i)=>{e(...i),this.off(t,s)};this.on(t,s)}};
const plppdo = new EventEmitter();

new MutationObserver((mutationsList) => { for (let mutation of mutationsList) if (mutation.type === 'childList') plppdo.emit('domChanged'); }).observe(document.body, { childList: true, subtree: true });

/* Misc Functions */
// Basic debug function, as devTab.js is not loaded
window.debug = function(message) {
    // console.log(`[DEBUG] ${message}`); // Uncomment for console logging
};
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = url => { const audio = new Audio(url); audio.play(); debug(`🔊 Playing audio from ${url}`); };
const findAndClickBySelector = selector => { const element = document.querySelector(selector); if (element) { element.click(); sendToast(`⭕ Pressionando ${selector}...`, 1000); } };

function sendToast(text, duration=5000, gravity='bottom') { Toastify({ text: text, duration: duration, gravity: gravity, position: "center", stopOnFocus: true, style: { background: "#000000" } }).showToast(); debug(text); };

async function showSplashScreen() {
    splashScreen.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity 0.5s ease;user-select:none;color:white;font-family:MuseoSans,sans-serif;font-size:30px;text-align:center;";
    splashScreen.innerHTML = '<span style="color:white;">KHAN</span><span style="color:#FF8C00;">.PCHAN</span>';
    document.body.appendChild(splashScreen);
    setTimeout(() => splashScreen.style.opacity = '1', 10);
};

async function hideSplashScreen() {
    splashScreen.style.opacity = '0';
    setTimeout(() => splashScreen.remove(), 1000);
};

async function loadScript(url, label) { return fetch(url).then(response => response.text()).then(script => { loadedPlugins.push(label); eval(script); }); }
async function loadCss(url) { return new Promise((resolve) => { const link = document.createElement('link'); link.rel = 'stylesheet'; link.type = 'text/css'; link.href = url; link.onload = () => resolve(); document.head.appendChild(link); }); }

/* Visual Functions - Integrated directly */
function setupVisuals() {

    plppdo.on('domChanged', () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shimmer-login {
                to {
                    background-position-x: 196.27%, 0px;
                    background-position-y: 0px, 0px;
                }
            }

            @keyframes shimmer {
                to {
                    background-position: 200% 0, 0 0;
                }
            }

            .khan-eclipse-text {
                display: inline-block;
                margin-left: 5px;
            }

            .khan-text {
                font-size: 32px;
                font-weight: bold;
                color: white;
                vertical-align: middle;
                background-image: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.9) 50%, transparent 100%),
                                  linear-gradient(to right, #8a2be2 0%, #ab82ff 100%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                background-size: 200% 100%, 100% 100%;
                background-position: -200% 0, 0 0;
                animation: shimmer-login 4s linear infinite;
            }

            .eclipse-text {
                font-size: 32px;
                font-weight: bold;
                color: white;
                vertical-align: middle;
                background-image: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.9) 50%, transparent 100%),
                                  linear-gradient(to right, #6a0dad 0%, #8a2be2 100%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                background-size: 200% 100%, 100% 100%;
                background-position: -200% 0, 0 0;
                animation: shimmer 2.5s infinite linear;
            }
        `;
        document.head.appendChild(style);

        const headerLogoLink = document.querySelector('[data-testid="header-logo"]');
        if (headerLogoLink) {
            headerLogoLink.setAttribute('aria-label', 'Khan ⌇ Eclipse');
            const oldLogoSvg = headerLogoLink.querySelector('svg._1rt6g9t');
            if (oldLogoSvg) {
                oldLogoSvg.remove();
            }
            if (!headerLogoLink.querySelector('.khan-eclipse-text')) {
                const khanText = document.createElement('span');
                khanText.textContent = 'Khan ';
                khanText.className = 'khan-text';

                const eclipseText = document.createElement('span');
                eclipseText.textContent = '⌇ Eclipse';
                eclipseText.className = 'eclipse-text';

                const textContainer = document.createElement('div');
                textContainer.className = 'khan-eclipse-text';
                textContainer.appendChild(khanText);
                textContainer.appendChild(eclipseText);

                headerLogoLink.insertBefore(textContainer, headerLogoLink.querySelector('svg._1rt6g9t'));
            }
        }
    });

    // Status Panel (moved from statusPanel.js)
    Object.assign(statsPanel.style, {
        position: 'fixed', top: '95%', left: '20px', width: '250px', height: '30px',
        backgroundColor: 'rgb(0,0,0,0.5)', color: 'white', fontSize: '13px', fontFamily: 'Arial, sans-serif',
        display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'default', borderRadius: '10px',
        userSelect: 'none', zIndex: '1000', transition: 'transform 0.3s', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)'
    });

    const getPing = async () => { if(window.disablePing) return ':( '; try { const t = performance.now(); await fetch('https://pt.khanacademy.org/', { method: 'HEAD' }); return Math.round(performance.now() - t); } catch { return 'Error'; } };

    let lastFrameTime = performance.now(), frameCount = 0, fps = 0;

    (function calcFPS() { if (++frameCount && performance.now() - lastFrameTime >= 1000) { fps = Math.round(frameCount * 1000 / (performance.now() - lastFrameTime)); frameCount = 0; lastFrameTime = performance.now(); } requestAnimationFrame(calcFPS); })();

    const getTime = () => new Date().toLocaleTimeString();
    const update = async () => statsPanel.innerHTML = `
        <span style="text-shadow: -1px 0.5px 0 #p, -2px 0px 0 #FF8C00;">Pchan</span>
        <span style="margin: 0 8px;">|</span><span>${fps}fps</span>
        <span style="margin: 0 8px;">|</span><span>${await getPing()}ms</span>
        <span style="margin: 0 8px;">|</span><span>${getTime()}</span>
    `;

    update(); document.body.appendChild(statsPanel); setInterval(update, 1000);

    // No dragging for status panel as per request
    // let isDraggingStats = false, offsetXStats, offsetYStats;
    // statsPanel.onmousedown = e => { isDraggingStats = true; offsetXStats = e.clientX - statsPanel.offsetLeft; offsetYStats = e.clientY - statsPanel.offsetTop; statsPanel.style.transform = 'scale(0.9)'; };
    // statsPanel.onmouseup = () => { isDraggingStats = false; statsPanel.style.transform = 'scale(1)'; };
    // document.onmousemove = e => { if (isDraggingStats) { Object.assign(statsPanel.style, { left: `${Math.max(0, Math.min(e.clientX - offsetXStats, window.innerWidth - statsPanel.offsetWidth))}px`, top: `${Math.max(0, Math.min(e.clientY - offsetYStats, window.innerHeight - statsPanel.offsetHeight))}px` }); }};

    if(device.mobile) plppdo.on('domChanged', () => window.location.href.includes("khanacademy.org/profile") ? statsPanel.style.display = 'flex' : statsPanel.style.display = 'none' );

    // WidgetBot (moved from widgetBot.js)
    if(!device.mobile) {
        const script = Object.assign(document.createElement('script'), {
            src: 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3',
            async: true,
            onload: () => {
                const discEmbed = new Crate({ server: '1286573512831533056', channel: '1286573601687867433',
                    location: ['bottom', 'right'], notifications: true, indicator: true, allChannelNotifications: true,
                    defer: false, color: '#000000'
                });
                plppdo.on('domChanged', () => window.location.href.includes("khanacademy.org/profile") ? discEmbed.show() : discEmbed.hide() );
            }
        });
        document.body.appendChild(script);
    }
}

/* Main Functions */
function setupMain(){
    loadScript(repoPath+'functions/questionSpoof.js', 'questionSpoof');
    loadScript(repoPath+'functions/videoSpoof.js', 'videoSpoof');
    loadScript(repoPath+'functions/minuteFarm.js', 'minuteFarm');
    loadScript(repoPath+'functions/spoofUser.js', 'spoofUser');
    loadScript(repoPath+'functions/answerRevealer.js', 'answerRevealer');
    loadScript(repoPath+'functions/customBanner.js', 'customBanner');
    loadScript(repoPath+'functions/autoAnswer.js', 'autoAnswer');
}

/* Inject */
if (!/^https?:\/\/([a-z0-9-]+\.)?khanacademy\.org/.test(window.location.href)) { alert("❌ Khanpchan Failed to Injected!\n\nVocê precisa executar o Khanpachan no site do Khan Academy! (https://pt.khanacademy.org/)"); window.location.href = "https://pt.khanacademy.org/"; }

showSplashScreen();

loadScript('https://raw.githubusercontent.com/adryd325/oneko.js/refs/heads/main/oneko.js', 'onekoJs').then(() => {
    // Ensure oneko is displayed if feature is true
    onekoEl = document.getElementById('oneko');
    if (onekoEl) {
        onekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')";
        if (features.onekoJs) {
            onekoEl.style.display = null; // Show oneko if feature is true
        } else {
            onekoEl.style.display = "none";
        }
    }
});
loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin').then(()=>{
    DarkReader.setFetchMethod(window.fetch);
    if (features.darkMode) { // Enable Dark Mode if feature is true
        DarkReader.enable();
    } else {
        DarkReader.disable();
    }
})
loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastifyCss');
loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin')
.then(async () => {
    fetch("https://pt.khanacademy.org/api/internal/graphql/getFullUserProfile",{referrer:"https://pt.khanacademy.org/profile/me",body:'{"operationName":"getFullUserProfile","query":"query getFullUserProfile($kaid: String, $username: String) {\\n  user(kaid: $kaid, username: $username) {\\n    id\\n    kaid\\n    key\\n    userId\\n    email\\n    username\\n    profileRoot\\n    gaUserId\\n    isPhantom\\n    isDeveloper: hasPermission(name: \\"can_do_what_only_admins_can_do\\")\\n    isPublisher: hasPermission(name: \\"can_publish\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isModerator: hasPermission(name: \\"can_moderate_users\\", scope: GLOBAL)\\n    isParent\\n    isTeacher\\n    isFormalTeacher\\n    isK4dStudent\\n    isKmapStudent\\n    isDataCollectible\\n    isChild\\n    isOrphan\\n    isCoachingLoggedInUser\\n    canModifyCoaches\\n    nickname\\n    hideVisual\\n    joined\\n    points\\n    countVideosCompleted\\n    bio\\n    profile {\\n      accessLevel\\n      __typename\\n    }\\n    soundOn\\n    muteVideos\\n    showCaptions\\n    prefersReducedMotion\\n    noColorInVideos\\n    newNotificationCount\\n    canHellban: hasPermission(name: \\"can_ban_users\\", scope: GLOBAL)\\n    canMessageUsers: hasPermission(\\n      name: \\"can_send_moderator_messages\\"\\n      scope: GLOBAL\\n    )\\n    isSelf: isActor\\n    hasStudents: hasCoachees\\n    hasClasses\\n    hasChildren\\n    hasCoach\\n    badgeCounts\\n    homepageUrl\\n    isMidsignupPhantom\\n    includesDistrictOwnedData\\n    includesKmapDistrictOwnedData\\n    includesK4dDistrictOwnedData\\n    canAccessDistrictsHomepage\\n    isInKhanClassroomDistrict\\n    underAgeGate {\\n      parentEmail\\n      daysUntilCutoff\\n      approvalGivenAt\\n      __typename\\n    }\\n    authEmails\\n    signupDataIfUnverified {\\n      email\\n      emailBounced\\n      __typename\\n    }\\n    pendingEmailVerifications {\\n      email\\n      __typename\\n    }\\n    hasAccessToAIGuideCompanionMode\\n    hasAccessToAIGuideLearner\\n    hasAccessToAIGuideDistrictAdmin\\n    hasAccessToAIGuideParent\\n    hasAccessToAIGuideTeacher\\n    tosAccepted\\n    shouldShowAgeCheck\\n    birthMonthYear\\n    lastLoginCountry\\n    region\\n    userDistrictInfos {\\n      id\\n      isKAD\\n      district {\\n        id\\n        region\\n        __typename\\n      }\\n      __typename\\n    }\\n    schoolAffiliation {\\n      id\\n      location\\n      __typename\\n    }\\n    __typename\\n  }\\n  actorIsImpersonatingUser\\n  isAIGuideEnabled\\n  hasAccessToAIGuideDev\\n}"}',method:"POST",mode:"cors",credentials:"include"})
    .then(async response => { let data = await response.json(); user = { nickname: data.data.user.nickname, username: data.data.user.username, UID: data.data.user.id.slice(-5) }; })

    sendToast("🐷 Khanpchan injetado com sucesso!");

    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');

    await delay(500);

    sendToast(`⭐ Bem vindo(a) de volta: ${user.nickname}`);
    if(device.apple) { await delay(500); sendToast(`🪽 Que tal comprar um Samsung?`); }

    loadedPlugins.forEach(plugin => sendToast(`🪝 ${plugin} Loaded!`, 2000, 'top') );

    hideSplashScreen();
    setupVisuals(); // Call the new setupVisuals function
    setupMain();

    console.clear();
});

/* Thank you to everyone who has purchased access to my cheat as of 10/28/24.
@Thomaz015
@grazynabazio
@melyssaxavier
@WESLEY.SPREDEMANN
@carine.rech.alves
@nazare.de.maria
@jowsanth
@bielzy
@rafaeldeagostino
@AMFDS
@Jv010107
@Mattheusfreitas01
@Guilhermeoliveira2623
@Matt010101
@voncallis
@Thamiris0001
@Holmes1212
@Martinss0000
@zRoque
@LaryCouto.com.br
@IanyckFerreira
@sales7
@AleSobral
@wbzz2121
@Umunizzz
@ViniciusMancini
@ricardaosantista
@marcos10pc
@bzinxxx
@ryanmzmartins
@Kaleb1577
@brunopereirabarros
@RodrigoMartins1236751
@guixzf
@Leandrohenrq
@damnntiago
@WhoisMe777
@Gustavopc21
@matheus.hx2
@WSZL
@LeozinB2
@Davas123
@joaoviturino
@orickmaxx
@l55nar5
@nextbyhawk
@Bruninda019
@GabrielRibeiroP
@Shinjoia
@hy7pee
@arthurmondequedutra
@PedrooVsp
@zBlucker
@vitiintavares
@Holmes1212
@Anthony06927
@refinado
@ErickMarinelli
@pedroomelhor
@gabrielmonteiro0053
@Felipealexandre10
@saantzx7
@alvarosouzaribeiro
@gabrielejte
@Kevinzada
@antonio77xs
@marcus.floriano.oliveira
@Ryumargin
*/

