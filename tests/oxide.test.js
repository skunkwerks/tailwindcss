import { crosscheck, run, html, css, defaults } from './util/run'

crosscheck(({ stable, oxide }) => {
  stable.test.todo('space-x uses physical properties')
  oxide.test('space-x uses logical properties', () => {
    let config = {
      content: [{ raw: html`<div class="space-x-4"></div>` }],
      corePlugins: { preflight: false },
    }

    return run('@tailwind base; @tailwind utilities;', config).then((result) => {
      expect(result.css).toMatchCss(css`
        ${defaults}
        .space-x-4 > :not([hidden]) ~ :not([hidden]) {
          --tw-space-x-reverse: 0;
          margin-right: calc(1rem * var(--tw-space-x-reverse));
          margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
        }
      `)
    })
  })
})
