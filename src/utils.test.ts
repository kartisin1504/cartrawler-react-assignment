import {
  fetchFeedWithFallback,
  flattenCars,
  legendFromCore,
  vendorLogo,
  parseSeatMin,
  formatDateTime,
  getFareRules,
} from './utils';

describe('fetchFeedWithFallback', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should return data from the remote fetch if successful', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'remote' }),
    });

    const result = await fetchFeedWithFallback();
    expect(result).toEqual({ data: 'remote' });
  });

  it('should return data from the fallback fetch if remote fails', async () => {
    (global.fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('Remote fetch failed'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: 'fallback' }),
      });

    const result = await fetchFeedWithFallback();
    expect(result).toEqual({ data: 'fallback' });
  });

  it('should return null if both remote and fallback fetches fail', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    const result = await fetchFeedWithFallback();
    expect(result).toBeNull();
  });
});

describe('legendFromCore', () => {
  it('should extract legend data from a complete core object', () => {
    const core = {
      VehRentalCore: {
        '@PickUpDateTime': '2025-09-14T10:00:00',
        '@ReturnDateTime': '2025-09-20T10:00:00',
        PickUpLocation: { '@Name': 'Location A' },
        ReturnLocation: { '@Name': 'Location B' },
      },
    };

    const result = legendFromCore(core);
    expect(result).toEqual({
      pickUp: '2025-09-14T10:00:00',
      return: '2025-09-20T10:00:00',
      pickUpLocation: 'Location A',
      returnLocation: 'Location B',
    });
  });

  it('should handle missing fields gracefully', () => {
    const core = {};
    const result = legendFromCore(core);
    expect(result).toEqual({
      pickUp: '',
      return: '',
      pickUpLocation: '',
      returnLocation: '',
    });
  });
});

describe('vendorLogo', () => {
  it('should return the correct logo for known vendors', () => {
    expect(vendorLogo('Alamo')).toBe('/assets/icons/alamo.svg');
    expect(vendorLogo('Avis')).toBe('/assets/icons/avis.svg');
    expect(vendorLogo('Hertz')).toBe('/assets/icons/hertz.svg');
  });

  it('should return the default logo for unknown vendors', () => {
    expect(vendorLogo('Unknown')).toBe('/assets/icons/partner.svg');
  });
});

describe('parseSeatMin', () => {
  it('should parse valid seat values correctly', () => {
    expect(parseSeatMin('5')).toEqual({ min: 5, openEnded: false });
    expect(parseSeatMin('5+')).toEqual({ min: 5, openEnded: true });
  });

  it('should handle invalid or undefined values gracefully', () => {
    expect(parseSeatMin(undefined)).toEqual({ min: 0, openEnded: false });
    expect(parseSeatMin('invalid')).toEqual({ min: 0, openEnded: false });
  });
});



describe('getFareRules', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should return fare rules for a valid key', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        'VENDOR:CODE': { rules: 'Fare rules' },
      }),
    });

    const result = await getFareRules('vendor', 'code');
    expect(result).toEqual({ rules: 'Fare rules' });
  });

  it('should return null if the key is not found', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const result = await getFareRules('vendor', 'code');
    expect(result).toBeNull();
  });

  it('should return null if the fetch fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    const result = await getFareRules('vendor', 'code');
    expect(result).toBeNull();
  });
});