import React, { useState } from 'react';

// Exact official SVG paths from simple-icons for logos requiring custom/authentic brand colors
const BrandSVGs = {
  // Official OpenAI / ChatGPT logo
  openai: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#10A37F" aria-hidden="true">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.5977 3.8465L13.1241 8.3736l2.0154-1.1638a.0804.0804 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.7475 8.0859v-5.6963a.79.79 0 0 0-.3548-.6486zm2.7186-2.5815a.0757.0757 0 0 1-.038-.052V3.526a4.504 4.504 0 0 1 7.371 3.4536l-.142-.0805-4.7783 2.7582a.7712.7712 0 0 0-.3927.6813v6.7369l-2.02-1.1686zm-11.4582 3.1973 2.8716-1.6579 2.8716 1.6579v3.3158l-2.8716 1.6579-2.8716-1.6579z" />
    </svg>
  ),

  // Official Anthropic logo (for Claude Code / Claude)
  anthropic: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#D97757" aria-hidden="true">
      <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5527h3.7442L10.5312 3.541ZM8.237 13.9018l2.133-5.5367 2.133 5.5367Z" />
    </svg>
  ),

  // Official Google Gemini logo
  gemini: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <defs>
        <linearGradient id="geminiOfficialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1ba1e3" />
          <stop offset="50%" stopColor="#546ee5" />
          <stop offset="100%" stopColor="#9b51e0" />
        </linearGradient>
      </defs>
      <path
        fill="url(#geminiOfficialGrad)"
        d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58Q12.93 6.9 12 4.41q0 2.49-.93 4.68a12.3 12.3 0 0 1-2.58 3.81Q6.9 14.52 4.41 15.45q2.49 0 4.68.93 2.19.96 3.81 2.58t2.14 3.36z"
      />
    </svg>
  ),

  // Official Hugging Face logo
  huggingface: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#FFD21E" aria-hidden="true">
      <path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92" />
    </svg>
  ),

  // Official Ollama mascot logo
  ollama: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#111827" aria-hidden="true">
      <path d="M16.361 10.26a.894.894 0 0 0-.558.47l-.072.148.001.207c0 .193.004.217.059.353.076.193.152.312.291.448.24.238.51.3.872.205a.86.86 0 0 0 .517-.436.752.752 0 0 0 .08-.498c-.064-.453-.33-.782-.724-.897a1.06 1.06 0 0 0-.466 0zm-9.203.005c-.305.096-.533.32-.65.639a1.187 1.187 0 0 0-.06.52c.057.309.31.59.598.667.362.095.632.033.872-.205.14-.136.215-.255.291-.448.055-.136.059-.16.059-.353l.001-.207-.072-.148a.894.894 0 0 0-.565-.472 1.02 1.02 0 0 0-.474.007Zm4.184 2c-.131.071-.223.25-.195.383.031.143.157.288.353.407.105.063.112.072.117.136.004.038-.01.146-.029.243-.02.094-.036.194-.036.222.002.074.07.195.143.253.064.052.076.054.255.059.164.005.198.001.264-.03.169-.082.212-.234.15-.525-.052-.243-.042-.28.087-.355.137-.08.281-.219.324-.314a.365.365 0 0 0-.175-.48.394.394 0 0 0-.181-.033c-.126 0-.207.03-.355.124l-.085.053-.053-.032c-.219-.13-.259-.145-.391-.143a.396.396 0 0 0-.193.032zm.39-2.195c-.373.036-.475.05-.654.086-.291.06-.68.195-.951.328-.94.46-1.589 1.226-1.787 2.114-.04.176-.045.234-.045.53 0 .294.005.357.043.524.264 1.16 1.332 2.017 2.714 2.173.3.033 1.596.033 1.896 0 1.11-.125 2.064-.727 2.493-1.571.114-.226.169-.372.22-.602.039-.167.044-.23.044-.523 0-.297-.005-.355-.045-.531-.288-1.29-1.539-2.304-3.072-2.497a6.873 6.873 0 0 0-.855-.031zm.645.937a3.283 3.283 0 0 1 1.44.514c.223.148.537.458.671.662.166.251.26.508.303.82.02.143.01.251-.043.482-.08.345-.332.705-.672.957a3.115 3.115 0 0 1-.689.348c-.382.122-.632.144-1.525.138-.582-.006-.686-.01-.853-.042-.57-.107-1.022-.334-1.35-.68-.264-.28-.385-.535-.45-.946-.03-.192.025-.509.137-.776.136-.326.488-.73.836-.963.403-.269.934-.46 1.422-.512.187-.02.586-.02.773-.002zm-5.503-11a1.653 1.653 0 0 0-.683.298C5.617.74 5.173 1.666 4.985 2.819c-.07.436-.119 1.04-.119 1.503 0 .544.064 1.24.155 1.721.02.107.031.202.023.208a8.12 8.12 0 0 1-.187.152 5.324 5.324 0 0 0-.949 1.02 5.49 5.49 0 0 0-.94 2.339 6.625 6.625 0 0 0-.023 1.357c.091.78.325 1.438.727 2.04l.13.195-.037.064c-.269.452-.498 1.105-.605 1.732-.084.496-.095.629-.095 1.294 0 .67.009.803.088 1.266.095.555.288 1.143.503 1.534.071.128.243.393.264.407.007.003-.014.067-.046.141a7.405 7.405 0 0 0-.548" />
    </svg>
  ),

  // Official Espressif logo (for ESP32)
  espressif: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#E7352C" aria-hidden="true">
      <path d="M12.926 19.324a7.6 7.6 0 00-2.983-6.754 7.44 7.44 0 00-3.828-1.554.697.697 0 01-.606-.731.674.674 0 01.743-.617 8.97 8.97 0 018 9.805 7.828 7.828 0 01-.298 1.542l1.989.56a11.039 11.039 0 001.714-.651 12.159 12.159 0 00.217-2.343A12.57 12.57 0 007.212 6.171a5.53 5.53 0 00-2 0 4.354 4.354 0 00-2.16 1.337 4.274 4.274 0 001.909 6.856 9.896 9.896 0 001.074.195 4.011 4.011 0 013.337 3.954 3.965 3.965 0 01-.64 2.16l1.371.88a10.182 10.182 0 002.057.342 7.52 7.52 0 00.21-1.391z" />
    </svg>
  ),

  // Official LangChain bird logo (for RAG / Prompt Engineering)
  langchain: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#1C3C3C" aria-hidden="true">
      <path d="M6.0988 5.9175C2.7359 5.9175 0 8.6462 0 12s2.736 6.0825 6.0988 6.0825h11.8024C21.2641 18.0825 24 15.3538 24 12s-2.736-6.0825-6.0988-6.0825ZM5.9774 7.851c.493.0124 1.02.2496 1.273.6228.3673.4592.4778 1.0668.8944 1.4932.5604.6118 1.199 1.1505 1.7161 1.802.4892.5954.8386 1.2937 1.1436 1.9975.1244.2335.1257.5202.31.7197.0908.1204.5346.4483.4383.5645.0555.1204.4702.286.3263.4027-.1944.04-.4129.0476-.5616-.1074-.0549.126-.183.0596-.2819.0432a4 4 0 0 0-.025.0736c-.3288.0219-.5754-.3126-.732-.565-.3111-.168-.6642-.2702-.982-.446-.0182.2895.0452.6485-.231.8353-.014.5565.8436.0656.9222.4804-.061.0067-.1286-.0095-.1774.0373-.2239.2172-.4805-.1645-.7385-.007-.3464.174-.3808.3161-.8096.352-.0237-.0359-.0143-.0592.0059-.0811.1207-.1399.1295-.3046.3356-.3643-.2122-.0334-.3899.0833-.5686.1757-.2323.095-.2304-.2141-.5878.0164-.0396-.0322-.0208-.0615.0018-.0864.0908-.1107.2102-.127.345-.1208-.663-.3686-.9751.4507-1.2813.0432-.092.0243-.1265.1068-.1845.1652-.05-.0548-.0123-.1212-.0099-.1857-.0598-.028-.1356-.041-.1179-.1366-.1171-.0395-.1988.0295-.286.0952-.0787-.0608.0532-.1492.0776-.2125.0702-.1216.23-.025.3111-.1126.2306-.1308.552.0814.8155.0455.203.0255.4544-.1825.3526-.39-.2171-.2767-.179-.6386-.1839-.9695-.0268-.1929-.491-.4382-.6252-.6462-.1659-.1873-.295-.4047-.4243-.6182-.4666-.9008-.3198-2.0584-.9077-2.8947-.266.1466-.6125.0774-.841" />
    </svg>
  ),

  // Official spaCy logo (for NLP)
  spacy: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#09A3D5" aria-hidden="true">
      <path d="M3.001 11.213c-.55-.065-.591-.803-1.297-.738-.342 0-.66.143-.66.457 0 .473.73.517 1.17.636.75.228 1.476.383 1.476 1.199 0 1.035-.811 1.394-1.884 1.394-.897 0-1.806-.318-1.806-1.142 0-.228.22-.407.432-.407.269 0 .363.114.457.301.208.367.44.563 1.019.563.367 0 .742-.139.742-.457 0-.452-.46-.55-.937-.66C.869 12.122.143 12 .057 11.062c-.09-1.598 3.242-1.659 3.433-.257-.004.253-.24.408-.489.408ZM6.964 9.81c1.171 0 1.835.979 1.835 2.186 0 1.211-.644 2.185-1.835 2.185-.66 0-1.072-.281-1.37-.713v1.598c0 .481-.155.714-.505.714-.428 0-.506-.273-.506-.714v-4.648c0-.379.159-.612.506-.612.326 0 .505.257.505.612v.13c.331-.416.71-.738 1.37-.738Zm-.277 3.54c.685 0 .991-.632.991-1.37 0-.722-.31-1.37-.991-1.37-.714 0-1.044.587-1.044 1.37 0 .762.335 1.37 1.044 1.37Zm2.907-2.398c0-.84.967-1.142 1.904-1.142 1.317 0 1.86.384 1.86 1.656v1.223c0 .29.179.869.179 1.044 0 .265-.244.432-.505.432-.29 0-.506-.342-.661-.587-.428.342-.881.587-1.574.5" />
    </svg>
  ),
};

// Official Devicon colored SVG links
const deviconUrls = {
  // Langages
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  php: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
  html5: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  css3: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  sql: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg',

  // AI & ML
  'machine learning': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
  'deep learning': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
  'scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
  tensorflow: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
  pytorch: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
  keras: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg',

  // Web
  'react.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  laravel: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
  blade: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
  'bootstrap css': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
  bootstrap: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',

  // Data
  mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  pandas: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
  numpy: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
  matplotlib: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg',
  'jupyter notebook': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg',
  jupyter: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg',

  // IoT
  arduino: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg',

  // Outils
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  github: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  postman: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
  'selenium ide': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg',
  selenium: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg',
};

// Skill-to-icon mapping lookup
function getSkillIconElement(name) {
  const key = String(name).toLowerCase().trim();

  // 1. Direct match with official customized brand SVGs
  if (key === 'chatgpt' || key === 'ia générative') {
    return BrandSVGs.openai;
  }
  if (key === 'claude code' || key === 'claude') {
    return BrandSVGs.anthropic;
  }
  if (key === 'gemini') {
    return BrandSVGs.gemini;
  }
  if (key === 'hugging face' || key === 'llm') {
    return BrandSVGs.huggingface;
  }
  if (key === 'ollama') {
    return BrandSVGs.ollama;
  }
  if (key === 'esp32') {
    return BrandSVGs.espressif;
  }
  if (key === 'rag' || key === 'prompt engineering') {
    return BrandSVGs.langchain;
  }
  if (key === 'nlp') {
    return BrandSVGs.spacy;
  }

  // 2. Devicon full-color official SVG
  const deviconUrl = deviconUrls[key];
  if (deviconUrl) {
    return (
      <img
        src={deviconUrl}
        alt={name}
        className="skill-logo-img"
        loading="lazy"
        width="18"
        height="18"
      />
    );
  }

  return null;
}

export function SkillBadge({ name }) {
  const icon = getSkillIconElement(name);

  return (
    <span className="tag skill-tag">
      {icon && <span className="skill-logo" aria-hidden="true">{icon}</span>}
      <span className="skill-name">{name}</span>
    </span>
  );
}

export default SkillBadge;
