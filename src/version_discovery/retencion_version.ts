import VersionDiscoverer from './version_discoverer';

/**
 * Retrieves the version attribute from a CFDI de Retenciones e Información de Pagos.
 *
 * Possible values are always '1.0', '2.0' or empty string.
 */
export default class RetencionVersion extends VersionDiscoverer {
  public rules(): Record<string, string> {
    return {
      '2.0': 'Version',
      '1.0': 'Version',
    };
  }
}
