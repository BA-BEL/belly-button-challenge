                  
// URL to use
url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch JSON
d3.json(url).then((data) => console.log(data));

//// Initializer
d3.json(url).then(init);

                  
                  //////// Functions ////////

// Initializer funciton
function init(data){
let sample = data.samples.map((arg) => arg.sample_values);
let otuids = data.samples.map((arg) => arg.otu_ids);
let otulabels = data.samples.map(arg => arg.otu_labels);

let toptensamples = [];
let toptenotuids = [];
let toptenotulabels = [];

//// Plot initial dataset

for(let i = 0; i < 10;i++){
    toptensamples.push(sample[0][i]);
    toptenotuids.push(String(otuids[0][i]));
    toptenotulabels.push(otulabels[0][i]);
}

    // console.log(`Top ten samples: ${toptensamples}`);
    // console.log(`Top ten otu ids: ${toptenotuids}`);
    // console.log(`Top ten otu labels: ${toptenotulabels}`);

// Reverse order of arrays
toptensamples.reverse();
toptenotuids.reverse();
toptenotulabels.reverse();

let plotdata = [{
    x:toptensamples,
    y:toptenotuids.map((arg) => `OTU ${arg}`),
    text:toptenotulabels,
    type:"bar",
    orientation:"h"
}];

Plotly.newPlot("bar",plotdata);

//// Fill dropdown menu with options
let option;

for(i = 0; i < data.samples.length; i++){
    option = d3.select("#selDataset").append("option");
    option_value = option.attr("value",Object.keys(data.samples)[i])
    option_text = option.text(data.samples[i].id)
}

}

// Update plot function




function optionChanged(this_value){

    // d3.json(url).then((data)=>console.log(data))

    let value = this_value;

    d3.json(url).then(function(data){

        let sample = data.samples.map((arg) => arg.sample_values);
        let otuids = data.samples.map((arg) => arg.otu_ids);
        let otulabels = data.samples.map(arg => arg.otu_labels);

        let toptensamples = [];
        let toptenotuids = [];
        let toptenotulabels = [];
    
        // Update dataset
    
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

        // console.log(`Top ten samples: ${toptensamples}`);
        // console.log(`Top ten otu ids: ${toptenotuids}`);
        // console.log(`Top ten otu labels: ${toptenotulabels}`);

        let plotdata = {
                x:toptensamples,
                y:toptenotuids.map((arg) => `OTU ${arg}`),
                text:toptenotulabels,
                type:"bar",
                orientation:"h"
            };

        Plotly.deleteTraces("bar",[0]);
        Plotly.addTraces("bar", plotdata);
    
    });
}


////





