import type { Car, FareRules, Legend } from './types'
export async function fetchFeedWithFallback(): Promise<any | null> {
  const remote = 'https://ajaxgeo.cartrawler.com/ctabe/cars.json'
  try { const r = await fetch(remote, { cache: 'no-store' }); if (r.ok) return await r.json(); throw new Error('Remote not OK') }
  catch { try { const l = await fetch('/cars.json', { cache: 'no-store' }); if (l.ok) return await l.json() } catch { }; return null }
}
export function flattenCars(feed: any[]): Car[] {
  const out: Car[] = []

  const toBool = (val: any): boolean | undefined => {
    if (val === true || val === false) return val
    if (typeof val === 'string') return val.toLowerCase() === 'true'
    return undefined
  }

  const toNum = (val: any): number => {
    const n = Number(val)
    return Number.isFinite(n) ? n : 0
  }

  feed?.forEach((vw: any, vi: number) => {
    const vendor =
      vw?.Vendor?.['@Name'] ||
      vw?.Vendor?.Name ||
      vw?.Vendor?.name ||
      'Vendor'

    const vendorCode =
      vw?.Vendor?.['@Code'] ||
      vw?.Vendor?.Code ||
      vw?.Vendor?.code ||
      undefined

    const av: any[] = vw?.VehAvails || vw?.VehAvail || vw?.['VehAvails'] || []

    av.forEach((a: any, idx: number) => {
      const core = a?.VehAvailCore || a
      const v = a?.Vehicle || core?.Vehicle || a?.['@Vehicle'] || {}

      const tc = a?.TotalCharge || core?.TotalCharge || a?.['TotalCharge'] || {}
      const price = toNum(tc?.['@RateTotalAmount'] ?? tc?.RateTotalAmount ?? tc?.Total)
      const currency = tc?.['@CurrencyCode'] ?? tc?.CurrencyCode ?? 'EUR'

      // Prefer the fleet label when present
      const name =
        v?.VehMakeModel?.['@Name'] ||
        v?.VehMakeModel?.Name ||
        v?.['@ModelName'] ||
        v?.ModelName ||
        v?.['@Name'] ||
        'Car'

      const pictureURL =
        v?.PictureURL ||
        v?.['@PictureURL'] ||
        '/assets/car-fallback.png'

      // Keep seat value raw (e.g. "5+"), for your exact-match filter
      const passengerQuantity =
        v?.['@PassengerQuantity'] ??
        v?.PassengerQuantity ??
        '—'

      const baggageQuantity =
        v?.['@BaggageQuantity'] ??
        v?.BaggageQuantity ??
        '—'

      const doors =
        v?.['@DoorCount'] ??
        v?.DoorCount ??
        '—'

      const code =
        v?.['@Code'] ??
        v?.Code ??
        undefined

      const codeContext =
        v?.['@CodeContext'] ??
        v?.CodeContext ??
        undefined

      out.push({
        id: `${vi}-${idx}`,
        vendor,
        vendorCode,
        name,
        code,
        codeContext,
        airConditionInd: toBool(v?.['@AirConditionInd'] ?? v?.AirConditionInd),
        transmission: String(v?.['@TransmissionType'] ?? v?.TransmissionType ?? ''),
        fuelType: v?.['@FuelType'] ?? v?.FuelType ?? '—',
        driveType: v?.['@DriveType'] ?? v?.DriveType ?? '—',
        passengerQuantity,
        baggageQuantity,
        doors,
        pictureURL,
        price,
        currency,
      })
    })
  })

  return out
}

export function legendFromCore(core: any): Legend { const rc = core?.VehRentalCore || {}; return { pickUp: rc['@PickUpDateTime'] || rc.PickUpDateTime || '', return: rc['@ReturnDateTime'] || rc.ReturnDateTime || '', pickUpLocation: (rc.PickUpLocation && (rc.PickUpLocation['@Name'] || rc.PickUpLocation.Name)) || '', returnLocation: (rc.ReturnLocation && (rc.ReturnLocation['@Name'] || rc.ReturnLocation.Name)) || '' } }

export function vendorLogo(name: string): string {
  const key = String(name || '').toLowerCase()
  if (key.includes('alamo')) return '/assets/icons/alamo.svg'
  if (key.includes('avis')) return '/assets/icons/avis.svg'
  if (key.includes('hertz')) return '/assets/icons/hertz.svg'
  return '/assets/icons/partner.svg'
}

export function parseSeatMin(val: string | number | undefined): { min: number, openEnded: boolean } {
  const raw = String(val ?? '').trim()
  if (!raw) return { min: 0, openEnded: false }
  if (raw.endsWith('+')) {
    const n = parseInt(raw.slice(0, -1), 10)
    return { min: isNaN(n) ? 0 : n, openEnded: true }
  }
  const n = parseInt(raw, 10)
  return { min: isNaN(n) ? 0 : n, openEnded: false }
}
export function formatDateTime(iso: string, locale: string = 'en-GB'): string {
  try {
    const date = new Date(iso)
    return new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date)
  } catch {
    return iso
  }
}
export async function getFareRules(vendor: string, code: string): Promise<FareRules | null> {
  const key = `${String(vendor||'').toUpperCase()}:${String(code||'').toUpperCase()}`
  try {
    const l = await fetch('/fare-rules.json', { cache: 'no-store' })
    if (!l.ok) return null
    const all = await l.json()
    return all[key] || null
  } catch {
    return null
  }
}
