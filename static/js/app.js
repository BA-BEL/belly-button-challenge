                  
// URL to use
url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch JSON
d3.json(url).then((data) => console.log(data));

//// Initializer
d3.json(url).then(init);

                  
                        //////// Functions ////////

///////// Initializer function
function init(data){

    // Get data
    let sample = data.samples.map((arg) => arg.sample_values);
    let otuids = data.samples.map((arg) => arg.otu_ids);
    let otulabels = data.samples.map(arg => arg.otu_labels);

    let toptensamples = [];
    let toptenotuids = [];
    let toptenotulabels = [];

// –––––––––––––––––––
    // Plot initial dataset's bar chart

    for(let i = 0; i < 10;i++){
        toptensamples.push(sample[0][i]);
        toptenotuids.push(String(otuids[0][i]));
        toptenotulabels.push(otulabels[0][i]);
    }

    // Reverse order of arrays
    toptensamples.reverse();
    toptenotuids.reverse();
    toptenotulabels.reverse();

    // Plot
    let plotdata = [{
        x:toptensamples,
        y:toptenotuids.map((arg) => `OTU ${arg}`),
        text:toptenotulabels,
        type:"bar",
        orientation:"h"
    }];

    Plotly.newPlot("bar",plotdata);

// –––––––––––––––––––
    // Plot initial dataset's bubble plot
    let bubbledata = [{
        x:otuids[0],
        y:sample[0],
        mode:"markers",
        text:otulabels[0],
        marker:{
            color:otuids[0],
            size:sample[0]
        },
        text:otulabels[0],
    }];

    let bubblelayout = {
        xaxis:{title:{text: "OTU ID"}}
    };

    Plotly.newPlot("bubble",bubbledata, bubblelayout)
// –––––––––––––––––––

    // Fill dropdown menu with options
    let option;

    for(i = 0; i < data.samples.length; i++){
        option = d3.select("#selDataset").append("option");
        option_value = option.attr("value",Object.keys(data.samples)[i])
        option_text = option.text(data.samples[i].id)
    }

// –––––––––––––––––––
    // Fill default demographic info

    for(let i = 0; i < Object.keys(data.metadata[0]).length; i++){
        console.log(Object.keys(data.metadata[0]))

        d3.select("#sample-metadata").append("p").html(
            `${Object.keys(data.metadata[0])[i]}: ${Object.values(data.metadata[0])[i]}`)
    }
// –––––––––––––––––––
}

////////// Update plot function

function optionChanged(this_value){

    let value = this_value;

    d3.json(url).then(function(data){
    
        //// Update dataset

        let sample = data.samples.map((arg) => arg.sample_values);
        let otuids = data.samples.map((arg) => arg.otu_ids);
        let otulabels = data.samples.map(arg => arg.otu_labels);

        let toptensamples = [];
        let toptenotuids = [];
        let toptenotulabels = [];
    
        
// ––––––––––––––––––– 
    //  Update Bar Chart   
        // Get top 10 values
        for(let i = 0; (i < 10 && i < sample[value].length);i++){
            toptensamples.push(sample[value][i]);
            toptenotuids.push(String(otuids[value][i]));
            toptenotulabels.push(otulabels[value][i]);
        }
    
        // Reverse order of arrays
        toptensamples.reverse();
        toptenotuids.reverse();
        toptenotulabels.reverse();

        let plotdata = {
                x:toptensamples,
                y:toptenotuids.map((arg) => `OTU ${arg}`),
                text:toptenotulabels,
                type:"bar",
                orientation:"h"
            };


        Plotly.deleteTraces("bar",[0]);
        Plotly.addTraces("bar", plotdata);
    

// –––––––––––––––––––
    // Update Bubble plot
    let bubbledata = [{
        x:otuids[value],
        y:sample[value],
        mode:"markers",
        text:otulabels[value],
        marker:{
            color:otuids[value],
            size:sample[value]
        },
        text:otulabels[value],
    }];

 
    Plotly.deleteTraces("bubble",[0]);
    Plotly.addTraces("bubble", bubbledata);
// –––––––––––––––––––

        //// Update demographic info
        d3.select("#sample-metadata").html("")
        for(let i = 0; i < Object.keys(data.metadata[value]).length; i++){    
            d3.select("#sample-metadata").append("p").html(
                `${Object.keys(data.metadata[value])[i]}: ${Object.values(data.metadata[value])[i]}`)
        }
    });
}


////





