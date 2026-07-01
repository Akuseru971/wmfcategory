# WMF 包丁・ナイフ — Premium Category Page

Page catégorie premium pour la collection **包丁・ナイフ** du WMF公式オンラインショップ, conçue dans la direction artistique de [cvmiracle.vercel.app](https://cvmiracle.vercel.app/).

## Aperçu

- **18 produits réels** avec noms, prix, images et liens officiels
- **7 séries** : ダマスティール, アルティメット, グランドウッド, グランドグルメ, シュピッツェンクラス, キネオ, ナイフ関連商品
- Design premium : header sticky, hero, filtres visuels, grille produit, sections éditoriales, footer
- Tri client : おすすめ順, 新着順, 人気順, 価格順
- Mobile-first avec drawer de filtres

## Développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Structure

```
src/
  app/           # Layout, globals CSS, page entry
  components/    # Header, Hero, ProductGrid, Footer, etc.
  data/          # Produits, séries, URLs officielles WMF
  hooks/         # Animations scroll reveal
```

## Intégration WMF Shop

Les liens produits pointent vers `https://shop.wmf.co.jp/shop/goods/index.html?ggcd=...`.
Les filtres série pointent vers les URLs `cid` officielles du catalogue existant.
