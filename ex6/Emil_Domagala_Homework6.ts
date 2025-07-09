class T6_1 {
  translations = {
    en: {
      greet: 'Hello',
      intro: 'Welcome to our website',
    },
    fr: {
      greet: 'Bonjour',
      intro: 'Bienvenue sur notre site web',
    },
  };

  localize(lang: 'fr' | 'en', text: 'greet' | 'intro') {
    return this.translations[lang][text];
  }
}

export const t6_1 = new T6_1();

class T6_2 {
  highlightKeywords(keywords: string[], template: string) {
    if (!template.includes('${' + (keywords.length - 1) + '}')) return new Error('Not enought keywords');
    for (let i = 0; i < keywords.length; i++) {
      const placeholder = `\${${i}}`;
      const res = `<span class="highlight">${keywords[i]}</span>`;
      template = template.replace(placeholder, res);
    }
    return template;
  }
}

export const t6_2 = new T6_2();

class T6_3 {
  multiline(str: string) {
    const texts = str.split('\n');
    // I would add .trim() but ex requires to preserve original indentation
    return texts.map((str, idx) => `${idx + 1}. ${str}`).join('\n');
  }
}

export const t6_3 = new T6_3();

class T6_4 {
  debunce(func: Function, delay: number) {
    let timer: NodeJS.Timeout;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func();
      }, delay);
    };
  }
}

export const t6_4 = new T6_4();

class T6_5 {
  throttle(func: Function, interval: number) {
    let lastCall = 0;
    return () => {
      const now = Date.now();
      if (now - lastCall < interval) return;
      lastCall = now;
      func();
    };
  }
}

export const t6_5 = new T6_5();

class T6_6 {
  curry(fn: Function, numOfArg: number) {
    function curried(...args: any) {
      if (args.length >= numOfArg) {
        return fn(...args);
      } else {
        return (nextArg: any) => curried(...args, nextArg);
      }
    }
    return curried;
  }
}

export const t6_6 = new T6_6();