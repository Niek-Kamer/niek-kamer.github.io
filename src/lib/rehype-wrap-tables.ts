import type { Element, Root } from 'hast';
import { SKIP, visit } from 'unist-util-visit';

/**
 * Wrap every `<table>` produced by MDX/Markdown in a
 * `<div class="table-wrap">` so we can attach `overflow-x: auto` plus a
 * fade-edge affordance via CSS, without editing every post.
 *
 * Why: wide tables in writing posts (per-phase decomp, no-inline residual,
 * etc.) overflow the prose column on narrow viewports with no scroll
 * indicator. A wrapper element lets CSS scope the horizontal scroll +
 * right-edge mask gradient to the right element while keeping the table
 * itself unstyled at the wrapper level.
 */
export function rehypeWrapTables() {
	return (tree: Root) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName !== 'table') return;
			if (!parent || typeof index !== 'number') return;

			// Guard against re-wrapping (idempotency under repeated runs).
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
			// Skip into the new wrapper; the visitor would otherwise descend
			// into the table we just nested and revisit it forever.
			return [SKIP, index + 1];
		});
	};
}
