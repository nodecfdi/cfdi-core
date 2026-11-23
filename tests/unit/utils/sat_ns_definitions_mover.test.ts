import { describe, expect, test } from 'vitest';
import SatNsDefinitionsMover from '../../../src/utils/sat_ns_definitions_mover';
import { nodeFromXmlString, nodeToXmlString } from '../../../src/xml_nodes/xml_node_utils';

describe('sat ns definitions mover', () => {
  test('moves only SAT namespace definitions to root', () => {
    const cfdiNs = 'http://www.sat.gob.mx/cfd/4';
    const cfdiXsd = 'http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd';
    const tfdNs = 'http://www.sat.gob.mx/TimbreFiscalDigital';
    const tfdXsd = 'http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd';
    const extNs = 'http://example.com/custom';
    const extXsd = 'http://example.com/custom.xsd';

    const inputXml = [
      `<cfdi:Comprobante xmlns:cfdi="${cfdiNs}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"`,
      ` xsi:schemaLocation="${cfdiNs} ${cfdiXsd}">`,
      '  <cfdi:Complemento>',
      `    <tfd:TimbreFiscalDigital xmlns:tfd="${tfdNs}" xsi:schemaLocation="${tfdNs} ${tfdXsd}"/>`,
      `    <ext:Custom xmlns:ext="${extNs}" xsi:schemaLocation="${extNs} ${extXsd}"/>`,
      '  </cfdi:Complemento>',
      '</cfdi:Comprobante>',
    ].join('');

    const expectedXml = [
      `<cfdi:Comprobante xmlns:cfdi="${cfdiNs}" xmlns:tfd="${tfdNs}"`,
      ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
      ` xsi:schemaLocation="${cfdiNs} ${cfdiXsd} ${tfdNs} ${tfdXsd}">`,
      '  <cfdi:Complemento>',
      '    <tfd:TimbreFiscalDigital/>',
      `    <ext:Custom xmlns:ext="${extNs}" xsi:schemaLocation="${extNs} ${extXsd}"/>`,
      '  </cfdi:Complemento>',
      '</cfdi:Comprobante>',
    ].join('');

    const node = nodeFromXmlString(inputXml);
    const mover = new SatNsDefinitionsMover();
    mover.move(node);

    expect(nodeToXmlString(node)).toEqualXML(expectedXml);
  });
});
