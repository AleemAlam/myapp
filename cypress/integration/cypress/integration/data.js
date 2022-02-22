let data = [];

async function canvasLogin() {
  let data = {
    email: "aleem@masaischool.com",
    password: "15319932",
  };

  let res = await fetch("https://attendance.masaischool.com/api/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let d = await res.json();
  console.log("d:", d);
}

async function getSubmissionURLS() {
  let res = await fetch(
    `https://attendance.masaischool.com/api/submission?assignment_id=1483`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 5|TgycvrCOQbH4yk2b9vsaIORYSMNgVFw5gWOUASgS",
      },
    }
  );

  let student_sub_data = await res.json();

  student_sub_data = student_sub_data.filter((el) => el.url !== null);
  console.log("student_sub_data:", student_sub_data);

  return student_sub_data;
}
canvasLogin();
getSubmissionURLS().then((res) => {
  const dataUrls = res.filter((item) => {
    console.log(item.url.includes("https://github.com"));
    return (
      !item.url.includes("https://github.com") &&
      !item.url.includes("https://drive")
    );
  });

  console.log("data---------------\n", dataUrls);
  const div = document.createElement("div");
  div.innerHTML = "[";
  dataUrls.map(({ url }) => {
    div.innerHTML += `"${url}",`;
  });
  div.innerHTML += "]";
  document.getElementsByTagName("body")[0].appendChild(div);
  data = dataUrls;
});
module.exports = data;
