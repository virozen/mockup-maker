function exportHTML() {
        const styles = document.querySelector('style').innerHTML;
        const htmlBody = document.getElementById('pv-root').innerHTML;
        const theme = document.getElementById('f-theme').value;

        // TEKNIK ASCII: Mengubah karakter kritis menjadi kode numerik agar tidak terbaca parser browser
        const s_start = String.fromCharCode(60, 115, 99, 114, 105, 112, 116); // <script
        const s_end = String.fromCharCode(60, 47, 115, 99, 114, 105, 112, 116, 62); // </script>
        
        const output = [
            '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">',
            s_start + ' src="https://cdn.tailwindcss.com">' + s_end,
            '<style>' + styles + 'body{background:#eee;display:flex;justify-content:center;margin:0;} .final-m{width:100%;max-width:480px;background:white;min-height:100vh;position:relative;}</style></head>',
            '<body><div class="final-m ' + theme + '">' + htmlBody + '</div>',
            mu ? '<audio id="bgm" loop src="' + mu + '"></audio>' : '',
            s_start + ' src="https://unpkg.com/lucide@latest">' + s_end,
            s_start + '>',
            'lucide.createIcons(); var play=false; document.querySelector(".music-btn").onclick=function(){',
            'var a=document.getElementById("bgm"); if(!a)return; play=!play; play?a.play():a.pause();',
            'document.getElementById("mi").setAttribute("data-lucide",play?"pause":"music"); lucide.createIcons();};',
            s_end + '</body></html>'
        ].join('\n');

        const blob = new Blob([output], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'undangan.html'; a.click();
    }