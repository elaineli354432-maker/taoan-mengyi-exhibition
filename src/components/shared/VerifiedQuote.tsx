export function VerifiedQuote({ quote, source }: { quote: string; source: string }) {
  return (
    <blockquote className="verified-quote">
      <p>{quote}</p>
      <cite>{source}</cite>
    </blockquote>
  )
}
