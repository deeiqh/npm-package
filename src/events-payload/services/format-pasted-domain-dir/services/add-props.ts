export function addProps(
  requiredOptionalOrAll: string,
  allRawDomainProps: string,
  domainProps: Record<string, string>,
  domainName: string,
): string {
  domainProps[requiredOptionalOrAll] = allRawDomainProps
    .replace(/(.+: )([^;]+)/g, '$1$2Props = new $2Props()')
    .replace(/: booleanProps = new booleanProps\(\)/g, ' = false')
    .replace(/: DateProps = new DateProps\(\)/g, ' = new Date()')
    .replace(/: DateValueProps = new DateValueProps\(\)/g, ' = new Date()');

  return domainProps[requiredOptionalOrAll]
    .replace(
      /(\w+)(\??): ([^=]+)(.+)/g,
      (match: string, property: string, optional: string, type: string) =>
        `import { ${type}} from './${domainName}-${property}';`,
    )
    .replace(/import { boolean } from (.+)\n/g, '');
}
