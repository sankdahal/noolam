import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProductBySlug } from '@/lib/catalog';
import ProductDetailView from '@/components/product/ProductDetailView';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return {
      title: 'Saree Not Found',
    };
  }
  return {
    title: `${product.name} — ${product.silkType}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | NOOLAM`,
      description: product.shortDescription,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.silkType === product.silkType || p.occasion === product.occasion)
  ).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'NOOLAM',
    },
    material: product.fabricDetails,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability:
        product.availability === 'In Stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/LimitedAvailability',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </>
  );
}
