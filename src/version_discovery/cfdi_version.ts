import VersionDiscoverer from './version_discoverer';

/**
 * Retrieves the version attribute from a Comprobante Fiscal Digital por Internet (CFDI).
 *
 * Possible values are always '3.2', '3.3', '4.0' or empty string.
 */
export default class CfdiVersion extends VersionDiscoverer {
  public rules(): Record<string, string> {
    return {
      '4.0': 'Version',
      '3.3': 'Version',
      '3.2': 'version',
    };
  }
}
