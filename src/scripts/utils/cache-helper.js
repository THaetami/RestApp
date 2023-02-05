import CONFIG from '../globals/config'

const CacheHelper = {
  async cachingAppShell (requests) {
    const cache = await this._openCache()
    cache.addAll(requests)
  },

  async deleteOldCache () {
    // eslint-disable-next-line no-undef
    const cacheNames = await caches.keys()
    cacheNames
      .filter((name) => name !== CONFIG.CACHE_NAME)
      // eslint-disable-next-line no-undef
      .map((filteredName) => caches.delete(filteredName))
  },

  async revalidateCache (request) {
    // eslint-disable-next-line no-undef
    const response = await caches.match(request)

    if (response) {
      this._fetchRequest(request)
      return response
    }
    return this._fetchRequest(request)
  },

  async _openCache () {
    // eslint-disable-next-line no-undef
    return caches.open(CONFIG.CACHE_NAME)
  },

  async _fetchRequest (request) {
    const response = await fetch(request)

    if (!response || response.status !== 200) {
      return response
    }

    await this._addCache(request)
    return response
  },

  async _addCache (request) {
    const cache = await this._openCache()
    cache.add(request)
  }
}

export default CacheHelper
