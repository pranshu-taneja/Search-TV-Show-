const container = document.querySelector(".container");
const input = document.querySelector("#search__input");

input.addEventListener("input", async function (e) {
  e.preventDefault();
  removeEmptyDivs();
  deleteImg();
  deleteSummary();
  const searchInput = this.value;
  const config = { params: { q: searchInput } };
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
  displayCard(res.data);
});

const displayCard = (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      const tvCard = document.createElement("div");
      tvCard.classList.add("tvCard");
      const tvshowName = document.createElement("figcaption"); // figcaption is better here?
      if (result.show.rating.average) tvshowName.innerText = `${result.show.name} \n Rating: ${result.show.rating.average}`;
      else tvshowName.innerText = `${result.show.name}\nRating: "N/A`;
      // const rating = document.createElement("figcaption");
      // if (result.show.rating.average) rating.innerHTML = `Rating: ${result.show.rating.average}`;
      // else rating.innerHTML = `Rating: "N/A"`;
      const frontFace = document.createElement("div");
      frontFace.classList.add("frontFace");
      const backFace = document.createElement("div");
      backFace.classList.add("backFace");
      backFace.innerHTML = result.show.summary;
      const showImg = document.createElement("img");
      showImg.src = result.show.image.medium;
      frontFace.appendChild(showImg);
      frontFace.appendChild(tvshowName);
      // frontFace.appendChild(rating);
      container.appendChild(frontFace);
      tvCard.appendChild(frontFace);
      tvCard.appendChild(backFace);
      container.appendChild(tvCard);
    }
  }
};

// Function to delete tv show Images since when user is searching for tv shows it
// needs to remove old images that were previously displayed
const deleteImg = () => {
  const imgs = document.querySelectorAll("img");
  for (const img of imgs) {
    img.remove();
  }
};

// Function to delete tv show summary since when user is searching for tv shows it
// needs to remove old summaries that were previously displayed
const deleteSummary = () => {
  const summary = document.querySelectorAll("p");
  for (const p of summary) {
    p.remove();
  }
};

const removeEmptyDivs = () => {
  container.innerHTML = "";
};

//function to remove html tags from the summary summary info we get from the api on the tv show.
// For debugging only.
function stripHtml(html) {
  let tmp = document.createElement("p");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}