function openTab(tabId) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }
    
    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // Show the selected tab content and mark button as active
    document.getElementById(tabId).style.display = 'block';
    event.currentTarget.classList.add('active');
}

function calculateTask1() {
    // Get input values
    const H = parseFloat(document.getElementById('H').value) || 0;
    const C = parseFloat(document.getElementById('C').value) || 0;
    const S = parseFloat(document.getElementById('S').value) || 0;
    const N = parseFloat(document.getElementById('N').value) || 0;
    const O = parseFloat(document.getElementById('O').value) || 0;
    const W = parseFloat(document.getElementById('W').value) || 0;
    const A = parseFloat(document.getElementById('A').value) || 0;
    
    // Validate inputs
    if (W >= 100 || (W + A) >= 100) {
        alert("Помилка: Сума вологості та золи не може бути 100% або більше!");
        return;
    }
    
    // Calculate coefficients
    const K_rd = 100 / (100 - W);
    const K_rg = 100 / (100 - W - A);
    
    // Dry mass composition
    const H_d = H * K_rd;
    const C_d = C * K_rd;
    const S_d = S * K_rd;
    const N_d = N * K_rd;
    const O_d = O * K_rd;
    const A_d = A * K_rd;
    
    // Combustible mass composition
    const H_g = H * K_rg;
    const C_g = C * K_rg;
    const S_g = S * K_rg;
    const N_g = N * K_rg;
    const O_g = O * K_rg;
    
    // Lower heating value (working mass)
    const Q_r = 339 * C + 1030 * H - 108.8 * (O - S) - 25 * W;
    
    // Convert to dry and combustible mass
    const Q_d = (Q_r + 0.025 * W) * 100 / (100 - W);
    const Q_g = (Q_r + 0.025 * W) * 100 / (100 - W - A);
    
    // Display results
    let resultsHTML = `
        <div class="result-item"><strong>1.1.</strong> Коефіцієнт переходу до сухої маси: ${K_rd.toFixed(2)}</div>
        <div class="result-item"><strong>1.2.</strong> Коефіцієнт переходу до горючої маси: ${K_rg.toFixed(2)}</div>
        
        <div class="result-item"><strong>1.3.</strong> Склад сухої маси:</div>
        <div class="result-item">- H<sup>d</sup> = ${H_d.toFixed(2)}%</div>
        <div class="result-item">- C<sup>d</sup> = ${C_d.toFixed(2)}%</div>
        <div class="result-item">- S<sup>d</sup> = ${S_d.toFixed(2)}%</div>
        <div class="result-item">- N<sup>d</sup> = ${N_d.toFixed(3)}%</div>
        <div class="result-item">- O<sup>d</sup> = ${O_d.toFixed(2)}%</div>
        <div class="result-item">- A<sup>d</sup> = ${A_d.toFixed(2)}%</div>
        
        <div class="result-item"><strong>1.4.</strong> Склад горючої маси:</div>
        <div class="result-item">- H<sup>g</sup> = ${H_g.toFixed(2)}%</div>
        <div class="result-item">- C<sup>g</sup> = ${C_g.toFixed(2)}%</div>
        <div class="result-item">- S<sup>g</sup> = ${S_g.toFixed(2)}%</div>
        <div class="result-item">- N<sup>g</sup> = ${N_g.toFixed(3)}%</div>
        <div class="result-item">- O<sup>g</sup> = ${O_g.toFixed(2)}%</div>
        
        <div class="result-item"><strong>1.5.</strong> Q<sup>P</sup><sub>H</sub> (робоча): ${(Q_r/1000).toFixed(4)} МДж/кг</div>
        <div class="result-item"><strong>1.6.</strong> Q<sup>d</sup><sub>H</sub> (суха): ${(Q_d/1000).toFixed(2)} МДж/кг</div>
        <div class="result-item"><strong>1.7.</strong> Q<sup>g</sup><sub>H</sub> (горюча): ${(Q_g/1000).toFixed(2)} МДж/кг</div>
    `;
    
    document.getElementById('results1').innerHTML = resultsHTML;
}

function calculateTask2() {
    // Get input values
    const C_g = parseFloat(document.getElementById('C_g').value) || 0;
    const H_g = parseFloat(document.getElementById('H_g').value) || 0;
    const O_g = parseFloat(document.getElementById('O_g').value) || 0;
    const S_g = parseFloat(document.getElementById('S_g').value) || 0;
    const Q_g = parseFloat(document.getElementById('Q_g').value) || 0;
    const W_r = parseFloat(document.getElementById('W_r').value) || 0;
    const A_d = parseFloat(document.getElementById('A_d').value) || 0;
    const V = parseFloat(document.getElementById('V').value) || 0;
    
    // Validate inputs
    if (W_r >= 100 || (W_r + A_d) >= 100) {
        alert("Помилка: Сума вологості та золи не може бути 100% або більше!");
        return;
    }
    
    // Conversion factor from combustible to working mass
    const K_gr = (100 - W_r - A_d) / 100;
    
    // Working mass composition
    const C_r = C_g * K_gr;
    const H_r = H_g * K_gr;
    const O_r = O_g * K_gr;
    const S_r = S_g * K_gr;
    const A_r = A_d * (100 - W_r) / 100;
    const V_r = V * (100 - W_r) / 100;
    
    // Lower heating value (working mass)
    const Q_r = Q_g * K_gr - 0.025 * W_r;
    
    // Display results
    let resultsHTML = `
        <div class="result-item"><strong>2.1.</strong> Склад робочої маси:</div>
        <div class="result-item">- Вуглець: ${C_r.toFixed(2)}%</div>
        <div class="result-item">- Водень: ${H_r.toFixed(2)}%</div>
        <div class="result-item">- Кисень: ${O_r.toFixed(2)}%</div>
        <div class="result-item">- Сірка: ${S_r.toFixed(2)}%</div>
        <div class="result-item">- Зола: ${A_r.toFixed(2)}%</div>
        <div class="result-item">- Ванадій: ${V_r.toFixed(2)} мг/кг</div>
        
        <div class="result-item"><strong>2.2.</strong> Q<sup>P</sup><sub>H</sub> (робоча): ${Q_r.toFixed(2)} МДж/кг</div>
    `;
    
    document.getElementById('results2').innerHTML = resultsHTML;
}