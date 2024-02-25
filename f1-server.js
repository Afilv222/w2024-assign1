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
      .eq('driverRef',req.params.ref);
    
      
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

app.get('/api/races/season/:year', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('races')
      .select('*')
      .eq('year',req.params.year)
      .order('round')
      
    
      
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


app.get('/api/races/season/:year/:round', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('races')
      .select('*')
      .eq('year',req.params.year)
      .eq('round',req.params.round)
      
    
    if (error) {
        throw error;
    }  
      
    if (!data || data.length === 0) {
        const {data, error} = await supabase
          .from('races')
          .select('*')
          .eq('year',req.params.year)
        
        const {data:round, error:error1} = await supabase
          .from('races')
          .select('*')
          .eq('round',req.params.round)
        
        if(data.length === 0){
            return errorHandler(res, req.params.year)  
        }else{
            return errorHandler(res, req.params.round)  
        }
            
    }

    res.send(data);
  }catch{
    res.json({ error: 'Server Error' });
  }
});


app.get('/api/races/circuits/:ref', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('races')
      .select(`* , circuits!inner()`)
      .eq('circuits.circuitRef',req.params.ref)
      .order('year')
      
    
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


app.get('/api/races/circuits/:ref/season/:start/:end', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('races')
      .select(`* , circuits!inner()`)
      .eq('circuits.circuitRef',req.params.ref)
      .gte('year',req.params.start) //greater than or equal to
      .lte('year',req.params.end) // less than or equal to
    
    if (error) {
        throw error;
    }  
      
    if (!data || data.length === 0) {
      
      const {data, error} = await supabase
        .from('races')
        .select('year', { count: 'exact' })
        .order('year', { ascending: false })
        .limit(1);
      
      const {data:ref, error:error1} = await supabase
      .from('circuits')
      .select('circuitRef')
      .eq('circuitRef',req.params.ref)
        
      
      if(ref.length === 0){
        return errorHanldingRef(res, req) 
      }else{
        return errorHanldingYear(res, req, data[0].year) 
      }  
      
        //return errorHandler(res, req.params.ref)    
    }

    res.send(data);
  }catch{
    res.json({ error: 'Server Error' });
  }
});


app.get('/api/results/:raceId', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('results')
      //.select(`drivers(driverRef, code, forename, surname),races(name, round, year,date),constructors(name, constructorRef, nationality)` )
      .select(`resultId, number, grid, 
              position, positionText, positionOrder, points, laps, time, milliseconds, 
              fastestLap, rank, fastestLapTime, fastestLapSpeed, statusId, 
              drivers(driverRef, code, forename, surname),
              races(name, round, year, date),
              constructors(name, constructorRef, nationality)`)
      .eq('raceId',req.params.raceId)
      .order('grid',{ ascending: true })
    
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

app.get('/api/results/driver/:ref', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('results')
      .select(`*, drivers!inner()` )
      .eq('drivers.driverRef',req.params.ref)
    
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


app.get('/api/results/driver/:ref/seasons/:start/:end', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('results')
      .select(`* , drivers!inner(),races!inner(year)`)
      .eq('drivers.driverRef',req.params.ref)
      .gte('races.year',req.params.start) //greater than or equal to
      .lte('races.year',req.params.end) // less than or equal to
    
    if (error) {
        //console.log(error)
        throw error;
    }  
      
    if (!data || data.length === 0) {
        
      const {data, error} = await supabase
        .from('races')
        .select('year', { count: 'exact' })
        .order('year', { ascending: false })
        .limit(1);
      
      const {data:ref, error:error1} = await supabase
      .from('drivers')
      .select('driverRef')
      .eq('driverRef',req.params.ref)
        
           
      if(ref.length === 0){
        return errorHanldingRef(res, req) 
      }else{
        return errorHanldingYear(res, req, data[0].year) 
      }  
    
    }

    res.send(data);
  }catch{
    res.json({ error: 'Server Error' });
  }
});

// Come back to this, make sure this is correct 
app.get('/api/qualifying/:raceId', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('qualifying')
      .select(`qualifyId,number,position,q1,q2,q3, drivers(driverRef, code, forename, surname), races(name, round, year, date), constructors(name, constructorRef, nationality)`)
      .eq('raceId',req.params.raceId)
      .order('position',{ ascending: true })
    
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


app.get('/api/standings/:raceId/drivers', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('driverStandings')
      .select(`driverStandingsId,raceId,points,position,positionText,wins , drivers(driverRef, code, forename, surname)`)
      .eq('raceId',req.params.raceId)
      .order('position',{ ascending: true })
    
    if (error) {
        throw error;
    }  
      
    if (!data || data.length === 0) {
        return errorHandler(res, req.params.raceId)    
    }

    res.send(data);
  }catch{
    res.json({ error: `Error you entered in ${req.params.raceId} which is not a valid parameter, this should be a number`});
  }
});

app.get('/api/standings/:raceId/constructors', async (req, res) => {
  try{
      const {data, error} = await supabase
      .from('constructorStandings')
      .select(`constructorStandingsId,raceId,points,position,positionText,wins , constructors(name, constructorRef, nationality)`)
      .eq('raceId',req.params.raceId)
      .order('position',{ ascending: true })
    
    if (error) {
        throw error;
    }  
      
    if (!data || data.length === 0) {
        return errorHandler(res, req.params.raceId)    
    }

    res.send(data);
  }catch{
    res.json({ error: `Error you entered in ${req.params.raceId} which is not a valid parameter, this should be a number` });
  }
});





const errorHandler = (res,req) => {
  return res.json({ error: `${req} does not exist in database` }); 
}


const errorHanldingYear = (res,req,latest_year) => {
  
    if(req.params.start > req.params.end ){
        return res.json({ error: `Error you entered in ${req.params.start} as start year and ${req.params.end} as end year, which is incorrect your start year needs to be less than end year` });
    }else if(req.params.start > latest_year ){
        return res.json({ error: `Error the start year ${req.params.start} you entered does not exist in database the lastest year is ${latest_year}`}) 
    }else{
        return res.json({ error: `No data found for ${req.params.ref} between these years ${req.params.start}-${req.params.end}`});
    }
}

 const errorHanldingRef = (res,req) => {
     return res.json({ error: `Error the ref you entered in (${req.params.ref}) does not exist in database`})
 }



app.listen(8080, () => {
        console.log('listening on port 8080');
} 
)