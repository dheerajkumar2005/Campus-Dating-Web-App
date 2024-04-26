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
// Helper function to check if an array contains all elements of another array
function containsAll(arr1, arr2) {
    return arr2.every(item => arr1.includes(item));
}
  
function filterProfiles(variable1, variable2, variable3, variable4, variable5) {
    return profiles.filter(profile => {
        // Condition 1: Filter by Gender if Variable1 is not empty and has length 3
        if (variable1.length > 0 && variable1.length != 3) {
        if (!variable1.includes(profile.Gender)) {
            return false;
        }
        }

        // Condition 2: Filter by Age
        if (variable2 !== 0 || variable3 !== 0) {
        let isWithinAgeRange =
            (variable2 != 0 && variable3 == 0 && profile.Age >= variable2) ||
            (variable2 != 0 && variable3 != 0 && profile.Age >= variable2 && profile.Age <= variable3) ||
            (variable2 == 0 && variable3 != 0 && profile.Age <= variable3);

        if (!isWithinAgeRange) {
            return false;
        }
        }

        // Condition 3: Filter by Interests
        if (variable4.length > 0) {
        if (!containsAll(profile.Interests, variable4)) {
            return false;
        }
        }

        // Condition 4: Filter by Hobbies
        if (variable5.length > 0) {
        if (!containsAll(profile.Hobbies, variable5)) {
            return false;
        }
        }

        // If all conditions are satisfied, include the profile in the filtered array
        return true;
    });
}


function findMatch() {
    let input_age=Number(document.getElementById("age").value)
    let input_gender=String(document.querySelector('input[name="gender"]:checked').value)
    let input_interests=Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(el=>el.value)
    let input_hobbies=Array.from(document.querySelectorAll('input[name="hobbies"]:checked')).map(el=>el.value)
    let input_fgender=Array.from(document.querySelectorAll('input[name="fgender"]:checked')).map(el=>el.value)
    let input_f_min_age=Number(document.getElementById("minAge").value)
    let input_f_max_age=Number(document.getElementById("maxAge").value)
    let input_finterests=Array.from(document.querySelectorAll('input[name="finterests"]:checked')).map(el=>el.value)
    let input_fhobbies=Array.from(document.querySelectorAll('input[name="fhobbies"]:checked')).map(el=>el.value)
    let input_search;
    if(document.querySelector('input[name="search"]:checked')!=null){
        input_search=String(document.querySelector('input[name="search"]:checked').value)
    }
    else{
        input_search="none"
    }
    console.log(input_f_min_age)
    // console.log(input_interests)
    // console.log(input_gender)
    // console.log(input_age)
    // console.log(input_hobbies)
    
    // let filter_array=[input_fgender,input_f_min_age,input_f_max_age,input_finterests,input_fhobbies]
    let new_profiles=filterProfiles(input_fgender,input_f_min_age,input_f_max_age,input_finterests,input_fhobbies)
        
    

    if(input_search=="none"){
        let score_arr=[];
        if(new_profiles.length>0){
            for(let i=0;i<new_profiles.length;i++){
                score_arr[i]=gender_score(input_gender,new_profiles[i].Gender)+age_score(input_age,new_profiles[i].Age)+interest_score(input_interests,new_profiles[i].Interests)+hobbies_score(input_hobbies,new_profiles[i].Hobbies)
            }
        
            let max_score=Math.max(...score_arr)
            let max_index=score_arr.indexOf(max_score)

            let max_indices=getIndicesOf(max_score,score_arr)
            let tie_breaker = [gender_score(input_gender, new_profiles[max_index].Gender), interest_score(input_interests, new_profiles[max_index].Interests), age_score(input_age, new_profiles[max_index].Age)]
            
            if (max_indices.length > 1) {
                for (let i = 0; i < max_indices.length; i++) {
                    if (max_indices[i]!= max_index) {
                        let temp_tie_breaker = [gender_score(input_gender, new_profiles[max_indices[i]].Gender), interest_score(input_interests, new_profiles[max_indices[i]].Interests), age_score(input_age, new_profiles[max_indices[i]].Age)]
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
        console.log(new_profiles[max_index])
        final_object=new_profiles[max_index]
        console.log(final_object)
        
        localStorage.clear()
        localStorage.setItem("output",JSON.stringify(final_object))
        }
        else{
            localStorage.clear()
            localStorage.setItem("output",null)
        }
    }
    else if(input_search=="Maximum match in Interests"){
        if(new_profiles.length>0){
        let score_arr=[]
        for (i=0;i<new_profiles.length;i++){
            score_arr[i]=countCommonElements(input_interests,new_profiles[i].Interests)  
        }
        let max_score=Math.max(...score_arr)
        let max_index=score_arr.indexOf(max_score)
        let max_indices=getIndicesOf(max_score,score_arr)
        let tie_breaker = [gender_score(input_gender, new_profiles[max_index].Gender), age_score(input_age, new_profiles[max_index].Age), hobbies_score(input_hobbies,new_profiles[max_index].Hobbies)]
        if (max_indices.length > 1) {
            for (let i = 0; i < max_indices.length; i++) {
                if (max_indices[i]!= max_index) {
                    let temp_tie_breaker = [gender_score(input_gender, new_profiles[max_indices[i]].Gender),age_score(input_age, new_profiles[max_indices[i]].Age), hobbies_score(input_hobbies, new_profiles[max_indices[i]].Hobbies) ]
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
        console.log(new_profiles[max_index])
        final_object=new_profiles[max_index]
        console.log(final_object)
        
        localStorage.clear()
        localStorage.setItem("output",JSON.stringify(final_object))
        }
        else{
            localStorage.clear()
            localStorage.setItem("output",null)
        }
    }
    else if(input_search=="Maximum match in Hobbies"){
        if(new_profiles.length>0){
        let score_arr=[]
        for (i=0;i<new_profiles.length;i++){
            score_arr[i]=countCommonElements(input_hobbies,new_profiles[i].Hobbies)  
        }
        let max_score=Math.max(...score_arr)
        let max_index=score_arr.indexOf(max_score)
        let max_indices=getIndicesOf(max_score,score_arr)
        let tie_breaker = [gender_score(input_gender, new_profiles[max_index].Gender), interest_score(input_interests,new_profiles[max_index].Interests), age_score(input_age, new_profiles[max_index].Age)]
        if (max_indices.length > 1) {
            for (let i = 0; i < max_indices.length; i++) {
                if (max_indices[i]!= max_index) {
                    let temp_tie_breaker = [gender_score(input_gender, new_profiles[max_indices[i]].Gender), interest_score(input_interests, new_profiles[max_indices[i]].Interests), age_score(input_age, new_profiles[max_indices[i]].Age)]
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
        console.log(new_profiles[max_index])
        final_object=new_profiles[max_index]
        console.log(final_object)
        
        localStorage.clear()
        localStorage.setItem("output",JSON.stringify(final_object))
        }
        else{
            localStorage.clear()
            localStorage.setItem("output",null)
        }
    }
    else if(input_search=="Maximum match in Interests+Hobbies"){
        if(new_profiles.length>0){
        let score_arr=[]
        for (i=0;i<new_profiles.length;i++){
            score_arr[i]=countCommonElements(input_interests,new_profiles[i].Hobbies)+countCommonElements(input_hobbies,new_profiles[i].Hobbies)  
        }
        let max_score=Math.max(...score_arr)
        let max_index=score_arr.indexOf(max_score)
        let max_indices=getIndicesOf(max_score,score_arr)
        let tie_breaker = [gender_score(input_gender, new_profiles[max_index].Gender), age_score(input_age, new_profiles[max_index].Age)]
        if (max_indices.length > 1) {
            for (let i = 0; i < max_indices.length; i++) {
                if (max_indices[i]!= max_index) {
                    let temp_tie_breaker = [gender_score(input_gender, new_profiles[max_indices[i]].Gender), age_score(input_age, new_profiles[max_indices[i]].Age)]
                    if (temp_tie_breaker[0] > tie_breaker[0]) {
                        max_index = max_indices[i]
                        tie_breaker = temp_tie_breaker
                    } 
                    else if (temp_tie_breaker[0] == tie_breaker[0]) {
                        if (temp_tie_breaker[1] > tie_breaker[1]) {
                            max_index = max_indices[i]
                            tie_breaker = temp_tie_breaker
                        }
                        
                    }
                }
            }
        }
        console.log(max_index)
        console.log(new_profiles[max_index])
        final_object=new_profiles[max_index]
        console.log(final_object)
        
        localStorage.clear()
        localStorage.setItem("output",JSON.stringify(final_object))
        }
        else{
            localStorage.clear()
            localStorage.setItem("output",null)
        }
    }   
    window.location.href="match.html"
}
function scrollThroughProfiles() {
    window.location.href="scroll_or_swipe.html"
}
function logout() {
    window.location.href="login.html"
}
function showFilters() {
    var x = document.getElementById("filters");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  
function showSearchCriteria() {
var x = document.getElementById("searchCriteria");
if (x.style.display === "none") {
    x.style.display = "block";
} else {
    x.style.display = "none";
}
}
 