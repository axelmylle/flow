export function isError(error: unknown) {
  if (!error) return false;

  const goCardLessError = error as {
    response: {
      data: {
        summary: string;
        detail: string;
        type?: string;
      };
    };
  };

  return {
    code:
      goCardLessError.response.data.type ||
      goCardLessError.response.data.summary,
    message: goCardLessError.response.data.detail,
  };
}

type GetMaxHistoricalDays = {
  transactionTotalDays: number;
  institutionId: string;
};

// https://bankaccountdata.zendesk.com/hc/en-gb/articles/11529718632476-Extended-history-and-continuous-access-edge-cases
export function getMaxHistoricalDays({
  transactionTotalDays,
  institutionId,
}: GetMaxHistoricalDays) {
  const RESTRICTED_TO_90DAYS = [
    "BRED_BREDFRPP",
    "SWEDBANK_SWEDSESS",
    "INDUSTRA_MULTLV2X",
    "MEDICINOSBANK_MDBALT22",
    "CESKA_SPORITELNA_LONG_GIBACZPX",
    "LHV_LHVBEE22",
    "BRED_BREDFRPP",
    "LABORALKUTXA_CLPEES2M",
    "BANKINTER_BKBKESMM",
    "CAIXABANK_CAIXESBB",
    "JEKYLL_JEYKLL002",
    "SANTANDER_DE_SCFBDE33",
    "BBVA_BBVAESMM",
    "BANCA_AIDEXA_AIDXITMM",
    "BANCA_PATRIMONI_SENVITT1",
    "BANCA_SELLA_SELBIT2B",
    "CARTALIS_CIMTITR1",
    "DOTS_HYEEIT22",
    "HYPE_BUSINESS_HYEEIT22",
    "HYPE_HYEEIT2",
    "ILLIMITY_ITTPIT2M",
    "SMARTIKA_SELBIT22",
    "TIM_HYEEIT22",
    "TOT_SELBIT2B",
    "OPYN_BITAITRRB2B",
    "PAYTIPPER_PAYTITM1",
    "SELLA_PERSONAL_CREDIT_SELBIT22",
    // "LUMINOR_", TODO: Fix based on country (all countries)
    // 'SEB_', (Baltics)
  ];

  const RESTRICTED_TO_180DAYS = ["COOP_EKRDEE22"];

  if (RESTRICTED_TO_90DAYS.some((str) => str.startsWith(institutionId))) {
    return 90;
  }

  if (RESTRICTED_TO_180DAYS.some((str) => str.startsWith(institutionId))) {
    return 180;
  }

  return transactionTotalDays;
}

type GetAccessValidForDays = {
  institutionId: string;
};

export function getAccessValidForDays({
  institutionId,
}: GetAccessValidForDays) {
  const RESTRICTED_TO_90DAYS = [
    "CUMBERLAND_CMBSGB2A",
    "NEWDAY_AMAZON_NEWDUK00X01",
    "NEWDAY_NEWPAY_NEWDUK00X15",
    "NEWDAY_BIP_NEWDUK00X05",
    "NEWDAY_ARGOS_NEWDUK00X04",
    "NEWDAY_MARBLES_NEWDUK00X13",
    "NEWDAY_WALLIS_NEWDUK00X21",
    "NEWDAY_HOUSEOFFRASER_NEWDUK00X11",
    "NEWDAY_EVANS_NEWDUK00X09",
    "NEWDAY_BURTON_NEWDUK00X06",
    "NEWDAY_AQUA_NEWDUK00X02",
    "NEWDAY_TUI_NEWDUK00X20",
    "NEWDAY_DEBENHAMS_NEWDUK00X07",
    "NEWDAY_OPUS_NEWDUK00X16",
    "NEWDAY_FLUID_NEWDUK00X10",
    "NEWDAY_PULSE_NEWDUK00X17",
    "NEWDAY_DOROTHYPERKINS_NEWDUK00X08",
    "CATER_ALLEN_CATEGB21",
    "ONEPAY_1PAYGB00",
    "BANK_OF_IRELAND_BUSINESS_ONLINE_BOFIGB2B",
    "BANK_OF_IRELAND_B365_BOFIGB2B",
    "LOMBARD_ODIER_GB_LOCYGB2L",
    "HOARES_HOABGB2L",
    "CHASE_CHASGB2L",
    "ABNAMRO_ABNAGB2L",
    "UBS_UBSWGB2L",
    "CAXTON_CAXTGB2L",
    "EBURY_EBURGB2L",
    "COUTTS_COUTGB22",
    "ALPHA_FX_APAHGB2L",
    "CYNERGY_BCYPGB2L",
    "CASHPLUS_NWBKGB2L",
    "MONZO_MONZGB2L",
    "HANDELSBANKEN_HANDGB22",
    "HANDELSBANKEN_CORPORATE_HANDGB22",
    "SAINSBURYS_SANBGB21",
    "TESCOBANK_TPFGGB2E",
    "BBVAUK_BBVAGB2L",
    "STARLING_SRLGGB3L",
    "REVOLUT_REVOGB21",
    "SANTANDER_GB_ABBYGB2L",
    "TIDE_TIDEGB00X01",
    "SVB_SVBKGB2L",
    "FIRST_DIRECT_MIDLGB22",
    "MNS_MSFEGB21",
    "HSBC_KINETIC_HBUKGB4B",
    "HSBC_BUSINESS_HBUKGB4B",
    "HSBC_HBUKGB4B",
    "HSBC_NET_HBUKGB4B",
    "ARBUTHNOT_LATHAM_ARBUGB2L",
    "CHE_CHELGB21",
    "YBS_YORBGB2V",
    "NATWEST_NWBKGB2L",
    "RBS_GB_RBSSGBKC",
    "NATWEST_CORP_NWBKGB2L",
    "ADAM_COMPANY_ACIMGB21",
    "RBS_GB_CORP_RBSSGBKC",
    "RBS_GB_CS_RBSSGBKC",
    "NATWEST_CS_NWBKGB2L",
    "ULSTER_ULSBGB2B",
    "NATWEST_INTERNATONAL_RBOSGIGI",
    "VANQUIS_VQISGB21",
    "NATIONWIDE_NAIAGB21",
    "CAPITALONE_NFBKUSF1",
    "DANSKEBANK_DABAGB2B",
    "DANSKEBANK_BUSINESS_DABAGB2B",
    "UNION_UBPGGB2X",
    "WISE_TRWIGB22",
    "TRIODOS_TRIOGB22",
    "AMERICAN_EXPRESS_AESUGB21",
    "BARCLAYS_CORPORATE_BUKBGB22",
    "BARCLAYS_BUSINESS_BUKBGB22",
    "BARCLAYCARD_COMMERCIAL_BUKBGB22",
    "BARCLAYCARD_BUKBGB22",
    "BARCLAYS_BUKBGB22",
    "BARCLAYS_WEALTH_BUKBGB22",
    "VIRGIN_NRNBGB22",
    "GLOBALREACH_GRPLGB2L",
    "COOPERATIVE_CPBKGB22",
    "UNITY_TRUST_UYTBGB22",
    "AIRWALLEX_AIPTAU32",
    "SOLDO_SOAVGB21",
    "GOHENRY_IDFEGIG1",
    "GHANA_GHIBGB2L",
    "THINKMONEY_THKMGB21",
    "METTLE_NWBKGB2L",
    "HARGREAVES_LANSDOWN_HLSVGB22",
    "MONESE_MNEEGB21",
    "TSB_GB_TSBSGB2A",
    "AIB_FTBKGB2B",
    "AIB_AIBKGB2L",
    "AIB_CORP_AIBKGB2L",
    "FINECO_UK_FEBIITM2",
    "CREDITSUISSE_CSUKGB2L",
    "SMBC_SMBCGB2L",
    "MBNA_MBNAGB22",
    "LLOYDS_COMMERCIAL_LOYDGB2L",
    "LLOYDS_BUSINESS_LOYDGB2L",
    "BANK_OF_SCOTLAND_BOFSGBS1",
    "BANK_OF_SCOTLAND_BUSINESS_BOFSGBS1",
    "LLOYDS_LOYDGB2L",
    "HALIFAX_HLFXGB22",
    "BANK_OF_SCOTLAND_COMMERCIAL_BOFSGBS1",
  ];

  if (RESTRICTED_TO_90DAYS.some((str) => str.startsWith(institutionId))) {
    return 90;
  }

  return 180;
}