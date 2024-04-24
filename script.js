let profiles;
        fetch('students.json')
			.then(response => response.json())
			.then(data => {
				// Parse the response into a JavaScript object
				profiles = data;
                console.log(profiles);
            }
        )
        .catch(error => console.error('Error fetching JSON data:', error));
function age_score(a1,a2){
    return 10-(2*Math.abs(a1-a2))
}
function countCommonElements(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return [...set1].filter(item => set2.has(item)).length;
}

function interest_score(arr1,arr2){
    no_of_common_elements=countCommonElements(arr1,arr2)
    max_length=Math.max(arr1.length,arr2.length)
    return 10*no_of_common_elements/(max_length)
}
function hobbies_score(arr1,arr2){
    no_of_common_elements=countCommonElements(arr1,arr2)
    max_length=Math.max(arr1.length,arr2.length)
    return 5*no_of_common_elements/(max_length)
}
function gender_score(g1,g2){
    if(g1=="Male"&&g2=="Female"){return 15}
    else if(g1=="Female"&&g2=="Male"){return 15}
    else if(g1=="Other"&&g2=="Other"){return 15}
    else if(g1=="Male"&&g2=="Male"){return 5}
    else if(g1=="Female"&&g2=="Female"){return 5}
    else if(g1=="Other"&&g2=="Male"){return 5}
    else if(g1=="Other"&&g2=="Female"){return 5}
    else if(g1=="Male"&&g2=="Other"){return 1}
    else if(g1=="Female"&&g2=="Other"){return 1}
}
function getIndicesOf(searchElement, array) {
    const indices = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] === searchElement) {
        indices.push(i);
      }
    }
    return indices;
  }


function findMatch() {
    
    let input_age=Number(document.getElementById("age").value)
    let input_gender=String(document.querySelector('input[name="gender"]:checked').value)
    let input_interests=Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(el=>el.value)
    let input_hobbies=Array.from(document.querySelectorAll('input[name="hobbies"]:checked')).map(el=>el.value)
    console.log(input_interests)
    console.log(input_gender)
    console.log(input_age)
    console.log(input_hobbies)
    let score_arr=[];
    for(let i=0;i<profiles.length;i++){
        score_arr[i]=gender_score(input_gender,profiles[i].Gender)+age_score(input_age,profiles[i].Age)+interest_score(input_interests,profiles[i].Interests)+hobbies_score(input_hobbies,profiles[i].Hobbies)
    }
    let max_score=Math.max(...score_arr)
    let max_index=score_arr.indexOf(max_score)

    let max_indices=getIndicesOf(max_score,score_arr)
    let tie_breaker = [gender_score(input_gender, profiles[max_index].Gender), interest_score(input_interests, profiles[max_index].Interests), age_score(input_age, profiles[max_index].Age)]
    
    if (max_indices.length > 1) {
        for (let i = 0; i < max_indices.length; i++) {
            if (max_indices[i]!= max_index) {
                let temp_tie_breaker = [gender_score(input_gender, profiles[max_indices[i]].Gender), interest_score(input_interests, profiles[max_indices[i]].Interests), age_score(input_age, profiles[max_indices[i]].Age)]
                if (temp_tie_breaker[0] > tie_breaker[0]) {
                    max_index = max_indices[i]
                    tie_breaker = temp_tie_breaker
                } 
                else if (temp_tie_breaker[0] == tie_breaker[0]) {
                    if (temp_tie_breaker[1] > tie_breaker[1]) {
                        max_index = max_indices[i]
                        tie_breaker = temp_tie_breaker
                    }
                    else if (temp_tie_breaker[1] == tie_breaker[1]) {
                        if (temp_tie_breaker[2] > tie_breaker[2]) {
                            max_index = max_indices[i]
                            tie_breaker = temp_tie_breaker
                        }
                    }
                }
            }
        }
    }

    console.log(max_index)
    console.log(profiles[max_index])
    localStorage.clear()
    localStorage.setItem("output",JSON.stringify(profiles[max_index]))
    window.location.href="match.html"
}
function scrollThroughProfiles() {
    window.location.href="scroll_or_swipe.html"
}
function logout() {
    window.location.href="login.html"
}
 