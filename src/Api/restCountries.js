import axios from "axios";

const API_KEY = import.meta.env.VITE_REST_COUNTRIES_API_KEY;

const api = axios.create({
  baseURL: "https://api.restcountries.com/countries/v5",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const LIST_FIELDS =
  "names.common,names.official,flag.url_svg,flag.url_png,capitals,region,population,borders,codes.alpha_3,codes.alpha_2,timezones";

const DETAIL_FIELDS =
  "names.common,names.official,flag.url_svg,flag.url_png,flag.emoji,capitals,region,subregion,population,borders,codes.alpha_3,codes.alpha_2,timezones,coordinates,continents,languages,currencies,tlds,calling_codes,area.kilometers,area.miles,landlocked";

function normalizeCountry(v5) {
  if (!v5) return v5;

  const capital = v5.capitals
    ? v5.capitals.map((c) => c.name)
    : [];

  const latlng = [];
  if (v5.coordinates) {
    if (v5.coordinates.lat != null) latlng[0] = v5.coordinates.lat;
    if (v5.coordinates.lng != null) latlng[1] = v5.coordinates.lng;
  }

  let languages = {};
  if (v5.languages) {
    for (const lang of v5.languages) {
      if (lang.bcp47) {
        languages[lang.bcp47] = lang.name;
      }
    }
  }

  let currencies = {};
  if (v5.currencies) {
    for (const curr of v5.currencies) {
      currencies[curr.code] = { name: curr.name, symbol: curr.symbol };
    }
  }

  return {
    name: {
      common: v5.names?.common || "",
      official: v5.names?.official || "",
    },
    cca3: v5.codes?.alpha_3 || "",
    cca2: v5.codes?.alpha_2 || "",
    capital,
    flags: {
      svg: v5.flag?.url_svg || "",
      png: v5.flag?.url_png || "",
    },
    region: v5.region || "",
    subregion: v5.subregion || "",
    population: v5.population || 0,
    borders: v5.borders || [],
    timezones: v5.timezones || [],
    latlng,
    continents: v5.continents || [],
    languages,
    currencies,
    coatOfArms: { png: null, svg: null },
    tlds: v5.tlds || [],
    callingCodes: v5.calling_codes || [],
    area: v5.area || null,
    landlocked: v5.landlocked || false,
    flagEmoji: v5.flag?.emoji || "",
  };
}

function extractData(response) {
  if (response?.data?.data?.objects) {
    return response.data.data.objects;
  }
  if (Array.isArray(response?.data)) {
    return response.data;
  }
  return [];
}

function handleError(error) {
  if (error.response) {
    const status = error.response.status;
    const msg = error.response.data?.errors?.[0]?.message || error.message;
    const err = new Error(`API Error ${status}: ${msg}`);
    err.status = status;
    throw err;
  } else if (error.request) {
    throw new Error("Network error: No response received from API");
  }
  throw error;
}

function hasFlag(country) {
  return country.flags?.svg || country.flags?.png;
}

export async function getAllCountriesPage({ limit = 100, offset = 0 } = {}) {
  try {
    const response = await api.get("", {
      params: { limit, offset, response_fields: LIST_FIELDS },
    });
    const raw = extractData(response);
    const meta = response?.data?.data?.meta;
    return {
      data: raw.map(normalizeCountry).filter(hasFlag),
      total: meta?.total || 0,
      more: meta?.more ?? false,
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getCountryByName(name) {
  try {
    const response = await api.get(
      `/names.common/${encodeURIComponent(name)}`,
      {
        params: { response_fields: DETAIL_FIELDS },
      }
    );
    const raw = extractData(response);
    return raw.length > 0 ? normalizeCountry(raw[0]) : null;
  } catch (error) {
    if (error.response?.status === 404) return null;
    handleError(error);
  }
}

export async function getCountryByCode(code) {
  try {
    const response = await api.get(
      `/codes.alpha_3/${encodeURIComponent(code)}`,
      {
        params: { response_fields: DETAIL_FIELDS },
      }
    );
    const raw = extractData(response);
    return raw.length > 0 ? normalizeCountry(raw[0]) : null;
  } catch (error) {
    if (error.response?.status === 404) return null;
    handleError(error);
  }
}

export async function getCountriesByRegion(region) {
  try {
    const response = await api.get(`/region/${encodeURIComponent(region)}`, {
      params: { limit: 100, response_fields: LIST_FIELDS },
    });
    const raw = extractData(response);
    return raw.map(normalizeCountry).filter(hasFlag);
  } catch (error) {
    handleError(error);
  }
}

export default api;
