/*------------------
    Page Content Change
--------------------*/

var overview_page = `<div class="anime__details__form">
                        <div class="section-title">
                            <h5>My page</h5>
                        </div>
                        <div class="chapter_img">
                            <img src="img/test_output.jpg" alt="Image">
                        </div>
                    </div>`;
var character_page = `<div class="anime__details__form">
                    <div class="section-title">
                        <h5>Character AI Generation</h5>
                    </div>
                    <form action="#">
                        <textarea placeholder="Key words about your character" id="character_input"></textarea>
                        <button type="submit" onclick="getResponse()"><i class="fa fa-location-arrow"></i>Generate</button>
                    </form>
                    </div>
                    <br>
                    <br>
                    <br>
                    <div class="anime__details__form">
                    <div class="section-title">
                        <h5>Generated Result</h5>
                    </div>
                    <div class="chapter_img">
                        <img src="img/test_character_output.jpg" id="character_input" alt="Image">
                    </div>
                </div>`;

var storyline_page = `<div class="anime__details__form">
                        <div class="section-title">
                            <h5>Storyline AI Generation</h5>
                        </div>
                        <form action="#">
                            <textarea placeholder="Your Story Abstract" id="story_input"></textarea>
                            <button type="submit" onclick="generateStory()"><i class="fa fa-location-arrow"></i>Generate</button>
                        </form>
                        </div>
                        <br>
                        <br>
                        <br>
                        <div class="anime__details__form">
                        <div class="section-title">
                            <h5>Generated Result</h5>
                        </div>
                        <form action="#">
                            <textarea placeholder="Storyline for the chapter: ..." id="story_output"></textarea>
                        </form>
                      </div>`;

var chapter_page =  `<div class="anime__details__form">
                        <div class="section-title">
                            <h5>Chapter Generation</h5>
                        </div>
                        <form action="#">
                            <textarea placeholder="Prompt 1" id="story_input"></textarea>
                            <textarea placeholder="Prompt 2" id="story_input"></textarea>
                            <textarea placeholder="Prompt 3" id="story_input"></textarea>
                            <textarea placeholder="Prompt 4" id="story_input"></textarea>
                            <button type="submit" onclick="generatePage()"><i class="fa fa-location-arrow"></i>Generate</button>
                        </form>
                        </div>
                        <br>
                        <br>
                        <br>
                        <div class="anime__details__form">
                        <div class="section-title">
                            <h5>Generated Result</h5>
                        </div>
                        <div class="chapter_img">
                            <img src="img/test_output.jpg" alt="Image">
                        </div>
                    </div>`;

function changeContent(option) {
    var contentDiv = document.getElementById("content");
    switch (option) {
        case 'Overview':
            contentDiv.innerHTML = overview_page;
            break;
        case 'Characters':
            contentDiv.innerHTML = character_page;
            break;
        case 'Storyline':
            contentDiv.innerHTML = storyline_page;
            break;
        case 'Chapters':
            contentDiv.innerHTML = chapter_page;
            break;
        default:
            contentDiv.innerHTML = "<h2>Error</h2>";
    }
}

/*------------------
    Character Generation
--------------------*/

/*------------------
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var inputTextarea = document.getElementById("character_input");

var raw = JSON.stringify({
  "key": "GnIdlTjIfnYkEltApg6Kler3ICvmWWIrdkEyzOOIeWQeP7HFzLMAk4kZhYfy",
  "prompt": inputTextarea,
  "negative_prompt": null,
  "width": "512",
  "height": "512",
  "samples": "1",
  "num_inference_steps": "20",
  "seed": null,
  "guidance_scale": 7.5,
  "safety_checker": "yes",
  "multi_lingual": "no",
  "panorama": "no",
  "self_attention": "no",
  "upscale": "no",
  "embeddings_model": null,
  "webhook": null,
  "track_id": null
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://stablediffusionapi.com/api/v3/text2img", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
--------------------*/


/*------------------
    Story Generation
--------------------*/
function generateStory() {
    // Get the input textarea element
    var inputTextarea = document.getElementById("story_input");
    
    // Get the value from the input textarea
    var inputValue = inputTextarea.value;
    console.log(inputValue);
    
    // Make a POST request to the ChatGPT API endpoint
    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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' // 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
        },
        body: JSON.stringify({
            model: 'text-davinci-003', // Specify the model you want to use 'text-davinci-003' 
            prompt: inputValue,
            max_tokens: 150 // Specify the maximum number of tokens to generate
        })
    })
    .then(response => response.json())
    .then(data => {
        // Get the output textarea element
        var outputTextarea = document.getElementById("story_output");
        console.log(data.choices);
        // Set the value of the output textarea to the generated response
        outputTextarea.value = data.choices[0].text.trim();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


/*------------------
    Page Generation
--------------------*/

function generatePage(){};