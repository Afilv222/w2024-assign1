const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();



const supaUrl = process.env.supaUrl;
const supaAnonKey = process.env.supaAnonKey;

const supabase = supa.createClient(supaUrl, supaAnonKey);



app.get('/api/seasons', async (req, res) => {
    const {data, error} = await supabase
    .from('seasons')
    .select('*')
    ;

    if (error) {
        console.error('Error fetching data:', error.message);
        return;
    }

    res.send(data);
});

app.get('/api/circuits', async (req, res) => {
    const {data, error} = await supabase
    .from('circuits')
    .select('*')
    ;

    if (error) {
        console.error('Error fetching data:', error.message);
        return;
    }

    res.send(data);
});






app.listen(8080, () => {
        console.log('listening on port 8080');
} 
)