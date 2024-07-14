import Markdoc, {
  type ConfigType,
  type RenderableTreeNode,
} from '@markdoc/markdoc'

/*
 * Markdoc configuration pass into velite
 */
const markdocConfig: ConfigType = {
  nodes: {
    heading: {
      children: ['inline'],
      attributes: {
        id: { type: String },
        level: { type: Number, required: true, default: 1 },
        link: { type: Boolean, default: true },
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config)
        const children = node.transformChildren(config)

        const id = generateID(children, attributes)

        return new Markdoc.Tag(
          `h${node.attributes['level']}`,
          { ...attributes, id },
          [
            ...children,
            attributes['link'] &&
              new Markdoc.Tag(
                'a',
                { href: `#${id}`, 'aria-hidden': '', tabIndex: '-1' },
                ['#']
              ),
          ]
        )
      },
    },
    paragraph: {
      attributes: {
        /* Attributes for Image */
        image_caption: { type: Boolean },
        image_title: { type: String },
        image_isvideo: { type: Boolean },
      },
      transform(node, config) {
        /* Unwrap image from paragraph, transform image nodes */
        const img = node.children[0].children[0]
        if (img.type === 'image') {
          /* Merge atrributes */
          img.attributes = { ...img.attributes, ...node.attributes }

          /* If src isn't a link, make it Cld id */
          if (!img.attributes.src.startsWith('http')) {
            img.attributes.id = img.attributes.src
            delete img.attributes.src
          }

          /* Caption, todo: seperate caption and alt text */
          let showcap = false
          if (img.attributes.image_caption) showcap = true

          /* Video */
          if (img.attributes.image_isvideo)
            return new Markdoc.Tag(
              'vid',
              img.transformAttributes(config),
              img.transformChildren(config)
            )

          return new Markdoc.Tag(
            'img',
            { ...img.transformAttributes(config), showcap },
            img.transformChildren(config)
          )
        }

        return new Markdoc.Tag(
          'p',
          node.transformAttributes(config),
          node.transformChildren(config)
        )
      },
    },
  },
  tags: {
    /* Definition List */
    deflist: {
      render: 'dl',
      children: ['paragraph', 'list'],
      transform(node, config) {
        const children: RenderableTreeNode[] = []

        for (const child of node.children) {
          /* Term */
          if (child.type === 'paragraph') {
            children.push(
              new Markdoc.Tag('dt', {}, child.transformChildren(config))
            )
          }

          /* Definitions */
          if (child.type === 'list') {
            /* list > item > inline > [what we want] */
            const defs = child.children.map((item) =>
              item.transformChildren(config)
            )
            for (const dd of defs) {
              children.push(new Markdoc.Tag('dd', {}, [...dd]))
            }
          }
        }
        return new Markdoc.Tag('dl', node.transformAttributes(config), children)
      },
    },
    /* Content Accordion  */
    expand: { render: 'Expand' },
  },
}

export default markdocConfig

function generateID(
  children: Array<RenderableTreeNode>,
  attributes: Record<string, unknown>
) {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id
  }
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
}
