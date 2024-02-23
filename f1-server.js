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

app.get('/api/circuits/:ref', async (req, res) => {
  try{
    const {data, error} = await supabase
    .from('circuits')
    .select('*')
    .eq('circuitRef',req.params.ref)
    ;
    
    if (error) {
        throw error; // Throw the error to be caught by the catch block
    }
    
    if (!data || data.length === 0) {
        return errorHandler(res, req.params.ref) 
    }

    res.send(data);
  }catch{
    res.json({ error: 'Server Error' });
  }
  
});

app.get('/api/circuits/season/:year', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('races')
      .select(`year,round, circuits(*)`)
      .eq('year',req.params.year)
      .order('round',{ ascending: true })
    
      
    if (error) {
        throw error;
    }  
      
    if (!data || data.length === 0) {
        return errorHandler(res, req.params.year)    
    }

    res.send(data);
  }catch{
    res.json({ error: 'Server Error' });
  }
});

app.get('/api/constructors', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('constructors')
      .select('*')
    
      
    if (error) {
        throw error;
    }  
      
    if (!data || data.length === 0) {
        return errorHandler(res, req)    
    }

    res.send(data);
  }catch{
    res.json({ error: 'Server Error' });
  }
});


app.get('/api/constructors/:ref', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('constructors')
      .select('*')
      .eq('constructorRef',req.params.ref)
    
      
    if (error) {
        throw error;
    }  
      
    if (!data || data.length === 0) {
        return errorHandler(res, req.params.ref)    
    }

    res.send(data);
  }catch{
    res.json({ error: 'Server Error' });
  }
});

app.get('/api/drivers', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('drivers')
      .select('*')
    
      
    if (error) {
        throw error;
    }  
      
    if (!data || data.length === 0) {
        return errorHandler(res, req)    
    }

    res.send(data);
  }catch{
    res.json({ error: 'Server Error' });
  }
});

app.get('/api/drivers/:ref', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('drivers')
      .select('*')
      .eq('driverRef',req.params.ref)
    
      
    if (error) {
        throw error;
    }  
      
    if (!data || data.length === 0) {
        return errorHandler(res, req.params.ref)    
    }

    res.send(data);
  }catch{
    res.json({ error: 'Server Error' });
  }
});

app.get('/api/drivers/search/:substring', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('drivers')
      .select('*')
      .ilike('surname', `${req.params.substring}%`)
    
      
    if (error) {
        throw error;
    }  
      
    if (!data || data.length === 0) {
        return errorHandler(res, req.params.substring)    
    }

    res.send(data);
  }catch{
    res.json({ error: 'Server Error' });
  }
});


app.get('/api/drivers/race/:raceId', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('qualifying')
      .select('drivers(*)')
      .eq('raceId',req.params.raceId)
    
      
    if (error) {
        throw error;
    }  
      
    if (!data || data.length === 0) {
        return errorHandler(res, req.params.raceId)    
    }

    res.send(data);
  }catch{
    res.json({ error: 'Server Error' });
  }
});

app.get('/api/races/:raceId', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('races')
      .select('raceId,year,round,name,date,time,url,fp1_date,fp1_time,fp2_date,fp2_time,fp3_date,fp3_time,quali_date,quali_time,sprint_date,sprint_time,circuits(name,location,country)')
      //.select('*')
      .eq('raceId',req.params.raceId)
    
      
    if (error) {
        throw error;
    }  
      
    if (!data || data.length === 0) {
        return errorHandler(res, req.params.raceId)    
    }

    res.send(data);
  }catch{
    res.json({ error: 'Server Error' });
  }
});



const errorHandler = (res,req) => {
  return res.json({ error: `not found ${req}` }); 
}






app.listen(8080, () => {
        console.log('listening on port 8080');
} 
)