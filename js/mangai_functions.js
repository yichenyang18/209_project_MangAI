/*------------------
    Page Content Change
--------------------*/

var overview_page = `<div class="anime__details__form">
                        <div class="section-title">
                            <h5>My page</h5>
                        </div>
                        <div class="chapter_img">
                            <img src="img/test_output.jpg" id="sliderImage" alt="Image">
                            <br>
                            <form action="#">
                            <button type="submit" onclick="nextImage()"><i class="fa fa-angle-right"></i> Next</button>
                            </form>
                        </div>
                    </div>`;

var character_page = `<div class="anime__details__form">
                    <div class="section-title">
                        <h5>Character AI Generation</h5>
                    </div>
                    <form action="#">
                        <textarea placeholder="Key words about your character" id="character_input"></textarea>
                        <label>Style:</label>
                        <select id="sd_styles">
                            <option value="anime">Anime</option>
                            <option value="comic-book">Comic Book</option>
                            <option value="pixel-art">Pixel Art</option>
                            <option value="line-art">Line Art</option>
                            <option value="digital-art">Digital Art</option>
                        </select>
                        <br><br>
                        <button type="submit" onclick="generateCharacter()"><i class="fa fa-location-arrow"></i>Generate</button>
                    </form>
                    </div>
                    <br>
                    <br>
                    <div class="anime__details__form">
                    <div class="section-title">
                        <h5>Generated Result</h5>
                    </div>
                    <div class="chapter_img" id="character_img_container">
                        <img src="img/test_character_output.jpg" id="character_output" alt="Image">
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
                            <textarea placeholder="Prompt 1" id="prompt1_input"></textarea>
                            <textarea placeholder="Prompt 2" id="prompt2_input"></textarea>
                            <textarea placeholder="Prompt 3" id="prompt3_input"></textarea>
                            <textarea placeholder="Prompt 4" id="prompt4_input"></textarea>
                            <label>Style:</label>
                            <select id="sd_styles">
                                <option value="anime">Anime</option>
                                <option value="comic-book">Comic Book</option>
                                <option value="pixel-art">Pixel Art</option>
                                <option value="line-art">Line Art</option>
                                <option value="digital-art">Digital Art</option>
                            </select>
                            <br><br>
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
                        <div class="chapter_img" id="character_img_container">
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
    Overview Pages
--------------------*/
var images = ["img/test_output.jpg", "img/test_output2.jpg", "img/test_character_output.jpg"]; // Array of image URLs
var currentIndex = 0; // Index of the currently displayed image

function nextImage() {
    var sliderImage = document.getElementById("sliderImage");
    
    // Increment the currentIndex and loop back to the start if necessary
    currentIndex = (currentIndex + 1) % images.length;
    
    // Update the src attribute of the image element
    sliderImage.src = images[currentIndex];
}



/*------------------
    Character Generation
--------------------*/

const path_sd = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

const headers_sd = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer sk-MaHkYwv6KROBk6CoIY5SRuwplWNoJWCvvaXMCfmedQZlGwfo"
};

var character_description;

function generateCharacter(){
    var inputTextarea = document.getElementById("character_input");
    var inputValue = inputTextarea.value;

    // Update character description
    character_description = inputValue;

    var selectedStyle = document.getElementById("sd_styles");
    var selectedStyleValue = selectedStyle.value;

    var body = {
        steps: 40,
        width: 1024,
        height: 1024,
        seed: 0,
        cfg_scale: 5,
        samples: 1,
        style_preset: selectedStyleValue,
        text_prompts: [
            {
            "text": "general, no details, simple, ((no background)), " + inputValue,
            "weight": 1
            },
            {
            "text": "blurry, bad, low resultion",
            "weight": -1
            }
        ],
    };

    fetch(
        path_sd,
        {
            headers: headers_sd,
            method: "POST",
            body: JSON.stringify(body),
        }
    )
    .then(response => response.json())
    .then(data => {
        console.log(data);

        var imageContainer = document.getElementById("character_img_container");
        imageContainer.innerHTML = "";

        data.artifacts.forEach(function(artifact, index) {
            // Create an image element
            var img = document.createElement("img");
    
            // Set the src attribute of the image to the decoded base64 string
            img.src = "data:image/png;base64," + artifact.base64; // Assuming the images are PNG format
    
            // Set additional attributes if needed
            img.alt = "Image " + (index + 1); // Set alt text for accessibility
    
            // Append the image to the image container
            imageContainer.appendChild(img);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

    console.log(character_description);
}

/*------------------
    Story Generation
--------------------*/

const API_KEY = "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";  // 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
const description = `For the following input, extend it to 4 sentence by adding additional actions and 
                    each sentence only consists of key words or short phrases including action and environmental description
                    (for example: John goes to school today -> 1. at home, walk to the door; 2. outside, get on
                    the school bus; 3. on the bus, sitting; 4. at school, goes into the classroom): `;

function generateStory() {  
    // Get the input textarea element
    var inputTextarea = document.getElementById("story_input");
    
    // Get the value from the input textarea
    var inputValue = inputTextarea.value;
    
    // Make a POST request to the ChatGPT API endpoint
    fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: description + inputValue}],
            temperature: 1.0,
            top_p: 0.7,
            n: 1,
            stream: false,
            presence_penalty: 0,
            frequency_penalty: 0,
          }),
        }
      )
    .then(response => response.json())
    .then(data => {
        // Get the output textarea element
        var outputTextarea = document.getElementById("story_output");
        
        // Set the value of the output textarea to the generated response
        outputTextarea.value = data.choices[0].message.content;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


/*------------------
    Page Generation
--------------------*/

function generatePage(){
    console.log(character_description);
    var prompt1 = document.getElementById("prompt1_input").value;
    var prompt2 = document.getElementById("prompt1_input").value;
    var prompt3 = document.getElementById("prompt1_input").value;
    var prompt4 = document.getElementById("prompt1_input").value;

    var prompts = [prompt1, prompt2, prompt3, prompt4];

    var selectedStyle = document.getElementById("sd_styles");
    var selectedStyleValue = selectedStyle.value;

    // Clear image container
    var imageContainer = document.getElementById("character_img_container");
    imageContainer.innerHTML = "";

    prompts.forEach(function(prompt){
        var body = {
            steps: 40,
            width: 1024,
            height: 1024,
            seed: 0,
            cfg_scale: 5,
            samples: 1,
            style_preset: selectedStyleValue,
            text_prompts: [
                {
                "text": "general, no details, simple, " + character_description + ", " + prompt,
                "weight": 1
                },
                {
                "text": "blurry, bad, low resultion",
                "weight": -1
                }
            ],
        };

        fetch(
            path_sd,
            {
                headers: headers_sd,
                method: "POST",
                body: JSON.stringify(body),
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);

            var imageContainer = document.getElementById("character_img_container");
            data.artifacts.forEach(function(artifact, index) {
                // Create an image element
                var img = document.createElement("img");
        
                // Set the src attribute of the image to the decoded base64 string
                img.src = "data:image/png;base64," + artifact.base64; // Assuming the images are PNG format
        
                // Set additional attributes if needed
                img.alt = "Image " + (index + 1); // Set alt text for accessibility
        
                // Append the image to the image container
                imageContainer.appendChild(img);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })
}