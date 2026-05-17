import type { Element, Root } from 'hast';
import { SKIP, visit } from 'unist-util-visit';

export function rehypeWrapTables() {
	return (tree: Root) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName !== 'table') return;
			if (!parent || typeof index !== 'number') return;

			if (
				parent.type === 'element' &&
				(parent as Element).tagName === 'div' &&
				Array.isArray((parent as Element).properties?.className) &&
				((parent as Element).properties.className as string[]).includes('table-wrap')
			) {
				return;
			}

			const wrapper: Element = {
				type: 'element',
				tagName: 'div',
				properties: { className: ['table-wrap'] },
				children: [node],
			};
			parent.children[index] = wrapper;
			return [SKIP, index + 1];
		});
	};
}
