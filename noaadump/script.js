const regex = /[0-9]{8}/;
const regex2 = /\n/;
const hilo = "HI_Hilo_5_S.txt";
//const stations = [["AK_Fairbanks_11_NE.txt", 26494], ["AK_Sitka_1_NE.txt", 25379], ["AK_St._Paul_4_NE.txt", 25711], ["AK_Utqiagvik_formerly_Barrow_4_ENE.txt", 27516], ["AL_Gadsden_19_N.txt", 63857], ["AL_Selma_13_WNW.txt", 63858], ["AZ_Elgin_5_S.txt", 53132], ["AZ_Tucson_11_W.txt", 53131], ["CA_Merced_23_WSW.txt", 93243], ["CA_Redding_12_WNW.txt", 04222], ["CA_Stovepipe_Wells_1_SW.txt", 53139], ["CO_Boulder_14_W.txt", 94075], ["CO_Cortez_8_SE.txt", 03061], ["CO_Dinosaur_2_E.txt", 94082], ["CO_La_Junta_17_WSW.txt", 03063], ["CO_Montrose_11_ENE.txt", 03060], ["CO_Nunn_7_NNE.txt", 94074], ["FL_Titusville_7_E.txt", 92821], ["GA_Brunswick_23_S.txt", 63856], ["GA_Newton_8_W.txt", 63828], ["GA_Newton_11_SW.txt", 63829], ["GA_Watkinsville_5_SSE.txt", 63850], ["HI_Hilo_5_S.txt", 21515], ["HI_Mauna_Loa_5_NNE.txt", 21514], ["IA_Des_Moines_17_E.txt", 54902], ["ID_Arco_17_SW.txt", 04126], ["ID_Murphy_10_W.txt", 04127], ["IL_Champaign_9_SW.txt", 54808], ["IL_Shabbona_5_NNE.txt", 54811]];
const stations = [["FL_Everglades_City_5_NE.txt", 92826], ["FL_Sebring_23_SSE.txt", 92827], ["FL_Titusville_7_E.txt", 92821], ["ME_Limestone_4_NNW.txt", 94645], ["ME_Old_Town_2_W.txt", 94644], ["NC_Asheville_8_SSW.txt", 53877], ["NC_Asheville_13_S.txt", 53878], ["NC_Durham_11_W.txt", 03758], ["ND_Medora_7_E.txt", 94080], ["NY_Ithaca_13_E.txt", 64758], ["NY_Millbrook_3_W.txt", 64756], ["SC_Blackville_3_W.txt", 63826], ["SC_McClellanville_7_NE.txt", 03728], ["VA_Cape_Charles_5_ENE.txt", 03739], ["VA_Charlottesville_2_SSE.txt", 03759]];
//const stations = [["AK_Fairbanks_11_NE.txt", 26494], ["AK_Sitka_1_NE.txt", 25379]];

let finalfinal = "";

function expork(vv, _filename) {
  const blob = new Blob([vv], {type:"text/plain"});
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  //link.download = "data.txt";
  link.download = `${_filename}.txt`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  //document.body.innerHTML = "done";
  window.URL.revokeObjectURL(url);
  console.log("export done");
}

function getdata(station, year) {
  //x = `${x}`;
  let datarr = "";
  //datarr = "";
  let out = [];
  let out_ = [];
  let out__ = [];
  fetch(`https://www.ncei.noaa.gov/pub/data/uscrn/products/daily01/${year}/CRND0103-${year}-${station[0]}`)
  .then(res => res.text())
  .then(data_ => {
    out = data_.split(" ");
    for (let i=0;i<out.length;i++) {
      if (out[i] != "" && out[i] != "C" && out[i] != "-99.000" && out[i] != "-9999.0" && out[i] != "21515" && out[i] && out[i] != "-9999.0 " && out[i] != "R" && out[i] != "U" && out[i] != "-9999.00" && out[i] != `${station[1]}` && out[i] != `-9999.0\n${station[1]}`) {
        out_.push(out[i]);
      }
    }

    let t = 0;
    let r = 0;

    //while (r < out_.length) {
      //let temparray = [];
      //filter and append to temparray
      //out__.push(temparray);
    //}

    //console.log(out_);
    let temparray = [];
    while (t < out_.length) {
      if (regex.test(out_[t])) {
        if (r <= 1) {
          //console.log(out_[t]);
          temparray = [];
          temparray.push(out_[t]);
          r++;
          t++;
        } else {
          //console.log(temparray);
          out__.push(temparray);
          temparray = [];
          //console.log(out_[t]);
          temparray.push(out_[t]);
          r = 0;
        }
      } else {
        if (r > 0) {
          if (!regex2.test(out_[t])) {
            temparray.push(out_[t]);
          }
          else {
            console.log(out_[t]);
          }
        }
        r++;
        t++;
      }
      if (t > 1000000000) break;
    } //damn bro how tf i even made this
    
    //console.log(out__);
    //out_.push("----------------------------------------------------------------------------------------------------------------------------------");
    //console.log(out_);

    datarr = "";
    for (let h=0;h<out__.length;h++) {
      //console.log(out__[h]);
      //document.body.innerHTML += `${station[1]}, ` + out__[h].join(", ") + "<br>";
      //console.log(out__[h]);
      datarr += `${station[1]}, ` + out__[h].join(", ") + "\n";
      //datarr += out__[h].join(", ") + "\n"
      //datarr += `${station[1]}`;
    }

    //console.log(datarr);
    //return datarr;


    return new Promise(resolve => {
      //console.log(finalfinal);
      finalfinal += datarr;
      //*****expork(datarr, `${station[0]}_${year}`);
      //console.log(datarr);
      resolve(datarr);
    });

    //return getdata(datarr);

    //document.body.innerHTML += datarr;
    //console.log(datarr);
    //document.body.innerHTML = document.body.innerHTML + out__.join(" ") + "<br><br><br>";
    //console.log(out_.join(", "));
  }).catch(err => console.warn(err));
  //console.log(6);
}

//let yeardata = "";
//let yeardata = getdata(parseInt(2020));
//console.log(4);

//for (let i=0;i<17;i++) {
  //yeardata += getdata(2005+i) + "----";
//}

//for (let i=0;i<17;i++) {
  //getdata(stations[0], 2005+i);
//}

//let final_data = "";

//async function eval() {
  //for (let i=0;i<2;i++) {
    //for (let q=0;q<2;q++) {
      //let v = await getdata(stations[i], 2007+q);
      //console.log(v);
    //}
  //}
  //return true;
//}

function bn() {
  for (let i=0;i<stations.length;i++) {
    for (let q=0;q<15;q++) {
      getdata(stations[i], 2007+q);
    }
  }
}

function prepdata() {
  for (let i=0;i<2;i++) {
    getdata(stations[0], 2007+i);
  }
}

bn();

//prepdata();
//console.log(finalfinal);
//expork(finalfinal);

//console.log(getdata(stations[0], 2007));

//bn();

//getdata(stations[0], 2008).then(res => {
  //console.log(res);
//})

//while (true) {
  //if (eval()) {
    //export();
    //break();
  //}
//}

//if (eval()) {
  //export();
  //break;
//}

//for (let i=0;i<2;i++) { //i<stations.length****
  //for (let q=0;q<2;q++) { // q<15
    //document.body.innerHTML += `adding station ${stations[i][1]}`;
    //final_data += getdata(stations[i], 2007+q);
    //getdata(stations[i], 2007+q);

    //******
    //getdata(stations[i], 2007+q).then(resultt => {
      //console.log(resultt);
      //final_data += resultt;
    //});

    //let v = await getdata(stations[i], 2007+q);
    //console.log(v);

    //console.log(getdata(stations[i], 2007+q));
    //final_data += q + " " + stations[i][1] + "\n";
  //}
//}

//console.log(getdata(stations[0], 2015));



//expork("kaj;sdlkfajs;d");
document.body.innerHTML = "DONE";

//bn().then(dta => expork(dta));
//console.log("begin output");
//bn().then(dta => console.log(dta));
//console.log(bn());

//if (eval()) {
  //expork();
  //break;
//}

//eval().then(expork());

//const out_data = JSON.stringify(final_data);
//const out_data = final_data;

//***const blob = new Blob([final_data], {type:"text/plain"});

//const blob = new Blob([out_data], {type:"text/plain"});

//***const url = window.URL.createObjectURL(blob);

//***const link = document.createElement("a");
//***link.download = "data2.txt";
//***link.href = url;
//***document.body.appendChild(link);
//***link.click();
//***document.body.removeChild(link);

//***document.body.innerHTML = "done";

//***window.URL.revokeObjectURL(url);


//console.log(yeardata);
//document.body.innerHTML = yeardata.join(", ");