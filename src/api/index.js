const url = "https://covid19.mathdro.id/api";
const startDate = {
  day: 10,
  month: 3,
  year: 2020
};

export const fetchDailyGlobalData = async () => {
  try {
    const response = await fetch(`${url}/countries/canada`);
    const json = await response.json();
    const { confirmed, deaths, recovered, lastUpdate } = json;
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate
    };
  } catch (error) {}
};

export const fetchDailiesData = async () => {
  try {
    const rec = async (x = {}) => {
      if (startDate.month === 4 && startDate.day === 26) {
        return x;
      } else {
        const res = await fetch(
          `${url}/daily/${startDate.month}-${startDate.day}-${startDate.year}`
        );

        const json = await res.json();
        const filtre = json.filter(data => data.countryRegion === "Canada");

        const provinceStats = Object.fromEntries(
          filtre.map(data => [
            data.provinceState,
            {
              confirmed: data.confirmed,
              deaths: data.deaths,
              recovered: data.recovered
            }
          ])
        );

        let globalStats = {
          deaths: 0,
          recovered: 0,
          confirmed: 0
        };

        filtre.forEach(province => {
          globalStats.deaths += Number(province.deaths);
          globalStats.recovered += Number(province.recovered);
          globalStats.confirmed += Number(province.confirmed);
        });

        x = {
          ...x,
          [`${startDate.month}/${startDate.day}/${startDate.year}`]: {
            province: provinceStats,
            global: globalStats
          }
        };

        startDate.day += 1;
        if (startDate.day === 32) {
          startDate.day = 1;
          startDate.month += 1;
        }

        return rec(x);
      }
    };
    const x = await rec();

    return x;
  } catch (error) {}
};
