let availableKeyword = ['ABKP', 'ABP', 'ABS', 'ADI', 'ADRA', 'AF', 'AGC', 'AH', 'AII', 'AKBA', 'AKN', 'AMH', 'AMP', 'ANND', 'APDJ', 'APR', 'ARA', 'ARMU', 'ASK', 'ASN', 'ASR', 'AUBR', 'AWB', 'AY', 'AZ', 'BAKA', 'BCA', 'BCY', 'BDC', 'BDLI', 'BDTS', 'BDWS', 'BE', 'BEAS', 'BELDA', 'BGK', 'BGLJ', 'BGP', 'BGS', 'BGT', 'BGU', 'BH', 'BHB', 'BHLE', 'BHP', 'BHS', 'BINA', 'BJP', 'BJRI', 'BJU', 'BKG', 'BKN', 'BKP', 'BKSC', 'BL', 'BLGR', 'BME', 'BNDA', 'BOE', 'BPL', 'BPQ', 'BRC', 'BRS', 'BRYA', 'BSB', 'BSBS', 'BSL', 'BSP', 'BST', 'BTE', 'BTI', 'BTT', 'BUH', 'BUI', 'BUP', 'BURN', 'BVI', 'BWN', 'BZA', 'BZU', 'CAR', 'CBE', 'CBH', 'CDG', 'CJN', 'CKP', 'CNB', 'CPJ', 'CPR', 'CPU', 'CRP', 'CSMT', 'CTO', 'CUK', 'CUX', 'CWA', 'DAB', 'DADN', 'DBA', 'DD', 'DEE', 'DGHR', 'DHD', 'DHN', 'DHO', 'DMH', 'DNR', 'DOKM', 'DOL', 'DR', 'DSS', 'DTO', 'DUI', 'DUMK', 'DURG', 'DWX', 'EKI', 'ERS', 'ET', 'ETW', 'FDB', 'FUT', 'FZR', 'GAP', 'GAYA', 'GD', 'GDA', 'GDG', 'GDR', 'GGC', 'GHD', 'GHY', 'GKP', 'GMO', 'GRH', 'GUNA', 'GWL', 'GZH', 'HAN', 'HD', 'HJP', 'HLZ', 'HOJ', 'HPT', 'HTZ', 'HWH', 'INDB', 'JAA', 'JAJ', 'JAT', 'JBP', 'JIND', 'JMP', 'JMU', 'JOP', 'JP', 'JRC', 'JSME', 'JUC', 'JYG', 'KAJ', 'KDPR', 'KEI', 'KGG', 'KGP', 'KIR', 'KIUL', 'KJH', 'KKDE', 'KLZ', 'KOAA', 'KOO', 'KOTA', 'KQR', 'KRMI', 'KRMR', 'KS', 'KSX', 'KTE', 'KTES', 'KTH', 'KTHU', 'KTO', 'KURJ', 'KWAE', 'KWH', 'KYN', 'KYQ', 'LAD', 'LAR', 'LDH', 'LGH', 'LRJ', 'LTT', 'LUSA', 'MAJ', 'MAJN', 'MAO', 'MAQ', 'MAS', 'MAU', 'MCTM', 'MDF', 'MDN', 'MDP', 'MFP', 'MGS', 'MJ', 'MKA', 'MKC', 'MLDT', 'MMCT', 'MMU', 'MNE', 'MOJ', 'MON', 'MRA', 'MRB', 'MRJ', 'MRR', 'MS', 'MSH', 'MTJ', 'MUE', 'MUR', 'MURI', 'MYR', 'MZP', 'NAD', 'NBQ', 'ND', 'NDLS', 'NDSL', 'NED', 'NFK', 'NGP', 'NH', 'NHT', 'NILE', 'NJP', 'NK', 'NNA', 'NPBR', 'NZM', 'OBR', 'PA', 'PAR', 'PAU', 'PBN', 'PC', 'PCOI', 'PERN', 'PGT', 'PHR', 'PKR', 'PNBE', 'PNC', 'PNME', 'PNU', 'PNVL', 'PRR', 'PRYJ', 'PSB', 'PUNE', 'R', 'RAJP', 'RDP', 'RJPB', 'RK', 'RKMP', 'RN', 'RNC', 'RNQ', 'ROK', 'RPH', 'RTA', 'RTM', 'RU', 'RXL', 'SA', 'SALE', 'SBIB', 'SBINB', 'SBP', 'SC', 'SDAH', 'SDL', 'SEB', 'SEY', 'SGNR', 'SGRL', 'SGUJ', 'SHC', 'SHG', 'SHR', 'SHT', 'SHTT', 'SJP', 'SLB', 'SM', 'SMI', 'SMR', 'SMVB', 'SNP', 'SNT', 'SOG', 'SPJ', 'SRC', 'SSM', 'ST', 'STA', 'SUR', 'SVPI', 'SVRP', 'SWM', 'TALL', 'TBM', 'TDL', 'TEL', 'TEN', 'TET', 'TKG', 'TMZ', 'TNA', 'TPH', 'TVC', 'UD', 'UJN', 'ULT', 'UMB', 'UMR', 'UREN', 'VAPI', 'VG', 'VGLJ', 'VID', 'VSKP', 'WL', 'YPR', 'ZBD', "MUGR", "KOP"]

const resultBox1 = document.querySelector("#result-Box1");
const inputBox1 = document.getElementById("source");

inputBox1.onkeyup = function () {
    let result = [];
    let input = inputBox1.value;
    if (input.length) {
        result = availableKeyword.filter((keyword) =>
            keyword.toUpperCase().includes(input.toUpperCase())
        );
        console.log(result);
    }
    displaySource(result);

    if (!result.length) {
        resultBox1.innerHTML = '';
    }
};

function displaySource(result) {
    const content = result.map((list) => {
        return "<li onclick='selectSource(this)'>" + list + "</li>";
    });

    resultBox1.innerHTML = "<ul>" + content.join(" ") + "</ul>";
}

function selectSource(list) {
    inputBox1.value = list.innerHTML;
    resultBox1.innerHTML = '';
}

// ================== DESTINATION STATION ==================
const resultBox2 = document.querySelector("#result-Box2");
const inputBox2 = document.getElementById("destination");

inputBox2.onkeyup = function () {
    let result = [];
    let input = inputBox2.value;
    if (input.length) {
        result = availableKeyword.filter((keyword) =>
            keyword.toUpperCase().includes(input.toUpperCase())
        );
        console.log(result);
    }
    displayDestination(result);

    if (!result.length) {
        resultBox2.innerHTML = '';
    }
};

function displayDestination(result) {
    const content = result.map((list) => {
        return "<li onclick='selectDestination(this)'>" + list + "</li>";
    });

    resultBox2.innerHTML = "<ul>" + content.join(" ") + "</ul>";
}

function selectDestination(list) {
    inputBox2.value = list.innerHTML;
    resultBox2.innerHTML = '';
}

function checkSameStation() {
    const sourceValue = inputBox1.value.trim().toUpperCase();
    const destinationValue = inputBox2.value.trim().toUpperCase();

    if (sourceValue && destinationValue && sourceValue === destinationValue) {
        alert("Source and Destination stations cannot be the same.");
        inputBox2.value = "";
        resultBox2.innerHTML = "";
    }
}

function selectSource(list) {
    inputBox1.value = list.innerHTML;
    resultBox1.innerHTML = '';
    checkSameStation();
}

function selectDestination(list) {
    inputBox2.value = list.innerHTML;
    resultBox2.innerHTML = '';
    checkSameStation();
}
