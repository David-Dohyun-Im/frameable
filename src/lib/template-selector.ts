import { templates, TemplateMetadata } from "./templates";

export interface TemplateSelectionResult {
  selectedTemplate: TemplateMetadata;
  confidence: number;
  reasoning: string;
}

/**
 * 키워드 기반으로 사용자 입력에 가장 적합한 템플릿을 선택합니다.
 */
export async function selectBestTemplate(userInput: string): Promise<TemplateSelectionResult> {
  const analysis = analyzeUserInput(userInput);
  
  // 키워드 분석 결과를 바탕으로 템플릿 선택
  let selectedTemplateId = 'portfolio'; // 기본값
  let confidence = 0.5;
  let reasoning = "기본 포트폴리오 템플릿을 선택했습니다.";
  
  if (analysis.suggestedTemplates.length > 0) {
    selectedTemplateId = analysis.suggestedTemplates[0];
    confidence = analysis.confidence;
    
    const template = templates[selectedTemplateId];
    reasoning = `사용자 입력에서 "${analysis.keywords.join(', ')}" 키워드를 감지하여 ${template.name} 템플릿을 선택했습니다.`;
  }
  
  const selectedTemplate = templates[selectedTemplateId];
  
  return {
    selectedTemplate,
    confidence,
    reasoning
  };
}

/**
 * 사용자 입력을 분석하여 템플릿 선택 힌트를 제공합니다.
 */
export function analyzeUserInput(userInput: string): {
  keywords: string[];
  suggestedTemplates: string[];
  confidence: number;
} {
  const input = userInput.toLowerCase();
  
  // 키워드 매칭을 통한 기본 분석
  const portfolioKeywords = ['portfolio', 'personal', 'website', 'showcase', 'profile', 'about', 'resume', 'cv'];
  const newsletterKeywords = ['newsletter', 'blog', 'content', 'article', 'writing', 'publishing', 'email', 'subscription'];
  const ecommerceKeywords = ['shop', 'store', 'ecommerce', 'e-commerce', 'marketplace', 'product', 'sell', 'buy', 'cart', 'payment'];
  
  const portfolioScore = portfolioKeywords.filter(keyword => input.includes(keyword)).length;
  const newsletterScore = newsletterKeywords.filter(keyword => input.includes(keyword)).length;
  const ecommerceScore = ecommerceKeywords.filter(keyword => input.includes(keyword)).length;
  
  const maxScore = Math.max(portfolioScore, newsletterScore, ecommerceScore);
  const totalKeywords = portfolioScore + newsletterScore + ecommerceScore;
  
  const suggestedTemplates = [];
  if (portfolioScore === maxScore) suggestedTemplates.push('portfolio');
  if (newsletterScore === maxScore) suggestedTemplates.push('newsletter');
  if (ecommerceScore === maxScore) suggestedTemplates.push('ecommerce');
  
  return {
    keywords: [...new Set([...portfolioKeywords, ...newsletterKeywords, ...ecommerceKeywords].filter(keyword => input.includes(keyword)))],
    suggestedTemplates,
    confidence: totalKeywords > 0 ? maxScore / totalKeywords : 0.3
  };
}
