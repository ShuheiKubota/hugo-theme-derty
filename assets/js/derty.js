function replaceSince(spanElem) {
    var v = spanElem.firstChild.data
    var mod = new Date(v)

    var s = since(new Date(Date.now()), new Date(v))
    //console.log(s)

    var expr = 'now'
    if (s.years) {
        expr = s.years + ' years ago'
    } else if (s.months) {
        expr = s.months + ' months ago'
    } else if (s.days) {
        expr = s.days + ' days ago'
    } else if (s.hours) {
        expr = s.hours + ' hours ago'
    } else if (s.minutes) {
        expr = s.minutes + ' minutes ago'
    }

    if (true) {
        expr = expr.replace('now', '今')
        expr = expr.replace('years', '年')
        expr = expr.replace('months', 'ヵ月')
        expr = expr.replace('days', '日')
        expr = expr.replace('hours', '時間')
        expr = expr.replace('minutes', '分')
        expr = expr.replace(' ago', '前')
    }

    spanElem.title = v
    spanElem.firstChild.data = expr
}

// おおよその経過時間を返す。
// 2 year, 35 months
// 11 months, 360 days
// 27 days
// 23 hours 59 minuts
function since(now, dt) {
    var s = null
    var d = now - dt

    var days = d / (24 * 60 * 60 * 1000)
    if (days >= 365)  {
        s = {...(s||{}), years: Math.trunc(days / 365)}
        days %= 365
    }
    if (days >= 28) {
        s = {...(s||{}), months: Math.trunc(days / (365 / 12))}
        days %= 365 / 12
    }
    if (s === null || s.years === undefined) {
        var days = Math.floor(days)
        if (days > 0) {
            s = {...(s||{}), days: Math.floor(d / (24 * 60 * 60 * 1000))}
        }
    }
    if (s !== null) {
        return s
    }

    d %= 24 * 60 * 60 * 1000
    //console.log('d', d)

    if (d >= 60 * 60 * 1000) {
        s = {...(s||{}), hours: Math.floor(d / (60 * 60 * 1000))}
        d %= 60 * 60 * 1000
    }
    if (d >= 60 * 1000) {
        //return {minutes: Math.floor(d / (60 * 1000))}
        s = {...(s||{}), minutes: Math.floor(d / (60 * 1000))}
    }

    return s || {}
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.highlight').forEach((e) => {
        var text = ''
        e.querySelectorAll('span.line').forEach((line) => text += line.textContent)
        //console.log(text)

        let btn = document.createElement('a')
        btn.append('copy')
        btn.setAttribute('class', 'copy')
        btn.addEventListener('click', (be) => navigator.clipboard.writeText(text))
        e.appendChild(btn)
    })

    document.querySelectorAll('.lastmod').forEach((e) => {
        replaceSince(e)
    })
    document.querySelectorAll('.may_be_outdated').forEach((e) => {
        var mod = new Date(e.getAttribute('derty-outdated-since'))
        var limitStr = e.getAttribute('derty-outdated-limit')
        var limit = 0
        try {
            limit = parseInt(limitStr)
        } catch (e) {
            console.log(e)
            return
        }
        var limitUnit = e.getAttribute('derty-outdated-limit-unit')

        if ((limit === null) || (limitUnit === null)) {
            return
        }

        var s = since(new Date(Date.now()), mod)

        var over = ''
        if (limitUnit === 'year' && s.years !== undefined && limit < s.years) {
            over = s.years + '年'
        } else if (limitUnit === 'month' && s.months !== undefined && limit < s.months) {
            over = s.months + 'ヵ月'
        }
        if (over !== '') {
            e.innerHTML = e.innerHTML.replace('%s', over)
            e.setAttribute('derty-outdated', '')
        }
    })
})
// vim: set et ft=javascript sts=4 sw=4 ts=4 : 
