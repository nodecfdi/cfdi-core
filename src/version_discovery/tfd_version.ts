import VersionDiscoverer from './version_discoverer';

/**
 * Retrieves the version attribute from a Timbre Fiscal Digital (TFD).
 *
 * Possible values are always '1.0', '1.1' or empty string.
 */
export default class TfdVersion extends VersionDiscoverer {
  public rules(): Record<string, string> {
    return {
      '1.1': 'Version',
      '1.0': 'version',
    };
  }
}
