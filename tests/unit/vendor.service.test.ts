import * as dotenv from 'dotenv'
import { Error } from 'sequelize'

dotenv.config({ path: '.env.test', override: true })

import { Vendor } from '../../models/vendor.model'
import VendorService from '../../services/vendor.service'
import { database } from '../../models'

beforeAll(async () => {
  dotenv.config({ path: '.env.test', override: true })
  database.addModels([Vendor])
  await Vendor.sync({ force: true })
})
// afterAll(async () => {
//   await Vendor.drop()
// })
// beforeEach(() => console.log('1 - beforeEach'))
// afterEach(() => console.log('1 - afterEach'))

class VendorNotFound extends Error { }

describe('Vendor service', () => {
  describe('Create vendor', () => {
    it('Should create a vendor entity in database', async () => {
      const vendorService = new VendorService()
      const name: string = 'Vendor 1'
      const countries: Array<string> = ['Iran']
      const vendor = await vendorService.create(name, countries)
      expect(vendor).toBeInstanceOf(Vendor)
      const data = vendor.toJSON()
      expect(data.name).toBe(name)
      expect(JSON.stringify(data.countries)).toBe(JSON.stringify(countries))
      expect(data.created_at).toBeDefined()
      expect(data.updated_at).toBeDefined()
    })
  })

  describe('Get a vendor', () => {
    it('Should return a vendor', async () => {
      const vendorService = new VendorService()
      const name: string = 'Vendor 1'
      const countries: Array<string> = ['Iran']
      const vendor = await vendorService.byId(1)

      if (!vendor) {
        throw new VendorNotFound('Vendor is null')
      }
      expect(vendor).toBeInstanceOf(Vendor)
      const data = vendor.toJSON()
      expect(data.name).toBe(name)
      expect(JSON.stringify(data.countries)).toBe(JSON.stringify(countries))
      expect(data.created_at).toBeDefined()
      expect(data.updated_at).toBeDefined()
      expect(data.created_at).toEqual(data.updated_at)
    })
  })

  describe('Update vendor', () => {
    it('Should update a vendor entity in database by vendor id', async () => {
      const vendorService = new VendorService()
      const uName: string = 'Vendor 1.1'
      const uCountries: Array<string> = ['Iran', 'US']
      const vendor = await vendorService.byId(1)

      if (!vendor) {
        throw new VendorNotFound('Vendor is null')
      }
      const data = vendor.toJSON()

      await vendorService.update(parseInt(data.id), uName, uCountries)

      const uVendor = await vendorService.byId(1)

      if (!uVendor) {
        throw new VendorNotFound('Vendor is null')
      }

      const uData = uVendor.toJSON()

      expect(uData.name).toEqual(uName)
      expect(JSON.stringify(uData.countries)).toBe(JSON.stringify(uCountries))
      expect(data.created_at).toBeDefined()
      expect(data.updated_at).toBeDefined()
      expect(data.created_at).not.toBe(data.updated_at)
    })
  })

  describe('Delete vendor', () => {
    it('Should delete a vendor by vendor id', async () => {
      const vendorService = new VendorService()
      let vendor = await vendorService.byId(1)
      if (!vendor) {
        throw new VendorNotFound('Vendor does not exists')
      }

      await vendorService.delete(1)
      vendor = await vendorService.byId(1)
      expect(vendor).toBeNull()
    })
  })

  describe('Paginate vendor', () => {
    it('Should paginate vendor', async () => {
      const vendorService = new VendorService()
      const name = 'Vendor'
      const countries = ['Iran']

      const raw = Array(50).fill(0).map((_, i) => {
        return { name: name + ' ' + (i + 1), countries }
      })
      await Vendor.bulkCreate(raw)

      let vendors = await vendorService.paginated()
      expect(vendors.length).toEqual(20)
      let latest = vendors[0].toJSON()
      expect(latest.id).toBe(51)
      vendors = await vendorService.paginated(20, 20)
      expect(vendors.length).toEqual(20)
      latest = vendors[0].toJSON()
      expect(latest.id).toBe(31)
    })
  })
})
