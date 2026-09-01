# Production Deployment Checklist for Netlify

Checklist ini harus selesai sebelum push ke production.

## Pre-Deployment (Local)

### Code & Configuration
- [ ] Baca `QUICK-START-NETLIFY.md`
- [ ] Jalankan `npm run verify` — pastikan tidak ada error
- [ ] Check `js/supabase-config.js` — pastikan Supabase config minimal
- [ ] Check semua HTML files — pastikan Supabase library di-include
- [ ] Test locally dengan `npx serve .` atau Live Server
- [ ] All features working:
  - [ ] Homepage load
  - [ ] Can view code
  - [ ] Can login/signup
  - [ ] Can upload
  - [ ] Can like/dislike
  - [ ] Can comment

### Git & Security
- [ ] No credentials di `.env` (use Netlify dashboard)
- [ ] `.gitignore` includes `.env`, `.env.local`, `node_modules`
- [ ] `SERVICE_ROLE_KEY` tidak hardcoded di code
- [ ] Semua files sudah `git add` dan `git commit`
- [ ] Push ke GitHub: `git push origin main`

### Supabase Setup
- [ ] Project sudah create di https://supabase.com
- [ ] Schema sudah run di SQL Editor (supabase-schema.sql)
- [ ] Email confirmation disabled
- [ ] Project URL dicopy
- [ ] Anon public key dicopy
- [ ] CORS rules sudah update (add Netlify domain)

## Deployment (Netlify)

### Connect Repository
- [ ] Login ke https://app.netlify.com
- [ ] Click "Add new site" > "Import an existing project"
- [ ] Authorize dengan GitHub/GitLab/Bitbucket
- [ ] Select repository `aura-dev`
- [ ] Leave build settings default
- [ ] Click "Deploy site"

### Set Environment Variables
- [ ] Go to Site Settings > Build & deploy > Environment
- [ ] Click "Edit variables"
- [ ] Add `SUPABASE_URL` (copy dari Project Settings > API)
- [ ] Add `SUPABASE_ANON_KEY` (copy dari Project Settings > API)
- [ ] Click Save
- [ ] Trigger redeploy: Deployments > "Trigger deploy" > "Deploy site"

### Verify Deployment
- [ ] Wait untuk deploy selesai (~30 detik)
- [ ] Check Deployments tab — status "Published"
- [ ] Open site URL (*.netlify.app)
- [ ] Homepage load dengan data ✅
- [ ] Browser console — no major errors
- [ ] Try login ✅
- [ ] Try upload code ✅
- [ ] Try like/dislike ✅
- [ ] Try comment ✅

## Post-Deployment

### Monitoring
- [ ] Subscribe ke email alerts (Netlify)
- [ ] Monitor deploy logs
- [ ] Check browser console untuk JavaScript errors
- [ ] Monitor Supabase logs (Project Dashboard)

### Documentation
- [ ] Add site URL ke README.md
- [ ] Document custom domain (if applicable)
- [ ] Share access details dengan team

### Maintenance
- [ ] Setup auto-deploy notification
- [ ] Create backup procedure
- [ ] Document how to update code
- [ ] Document how to update database schema

## Rollback Plan (Jika Ada Error)

Jika deployment fails atau ada critical error:

```bash
# Option 1: Revert last commit
git revert HEAD
git push origin main
# Netlify akan auto-deploy revert

# Option 2: Manual rollback via Netlify
# Netlify Dashboard > Deployments > Select previous deployment > "Publish deploy"

# Option 3: Check logs
# Netlify > Deployments > Click status > View logs
```

## Security Checklist

- [ ] No hardcoded credentials di repository
- [ ] Environment variables set di Netlify dashboard
- [ ] SERVICE_ROLE_KEY tidak di client-side code
- [ ] CORS configured correctly
- [ ] RLS policies enabled di Supabase
- [ ] Email verification setup (if needed)
- [ ] SSL/HTTPS enabled (Netlify default)
- [ ] Domain configured (if using custom domain)

## Performance Checklist

- [ ] Site loads under 3 seconds
- [ ] JavaScript bundle size reasonable
- [ ] CDN assets cached properly
- [ ] Database queries optimized
- [ ] No N+1 queries
- [ ] Pagination working untuk large datasets

## Testing Checklist

### Functional Tests
- [ ] All pages load
- [ ] All buttons work
- [ ] All forms submit
- [ ] All links work
- [ ] Search functionality works
- [ ] Filter functionality works

### User Flows
- [ ] New user signup
- [ ] Existing user login
- [ ] Upload new code
- [ ] View uploaded code
- [ ] Like/dislike code
- [ ] Comment on code
- [ ] Admin delete other users' content

### Mobile Tests
- [ ] Responsive design
- [ ] Touch interactions work
- [ ] No horizontal scroll
- [ ] Mobile-friendly fonts
- [ ] Forms accessible on mobile

### Cross-Browser Tests
- [ ] Chrome ✅
- [ ] Firefox ✅
- [ ] Safari ✅
- [ ] Edge ✅

## Sign-Off

- [ ] All checklist items complete
- [ ] QA has tested
- [ ] Stakeholders approved
- [ ] Ready for production ✅

---

**Deployment Date**: ________________
**Deployed By**: ________________
**Netlify Site URL**: ________________
**Notes**: 

